import { NextResponse } from "next/server";

import { getProblem } from "@/entities/problem";
import { getCurrentUser } from "@/entities/session";
import {
  buildHintMessages,
  encodeSse,
  HINT_DAILY_LIMIT,
  isHintRejectReason,
  parseHintRequest,
  type HintErrorCode,
  type HintErrorResponse,
  type HintStreamEvent,
} from "@/features/request-hint";
import { getPreviousHints } from "@/features/request-hint/server";
import { createAiClient } from "@/shared/api/ai/create-ai-client";
import { createAdminClient } from "@/shared/api/supabase/admin";
import { AI_MODEL } from "@/shared/config/server-env";

export const maxDuration = 60;

const ERROR_STATUS: Record<HintErrorCode, number> = {
  unauthorized: 401,
  invalid_request: 400,
  problem_not_found: 404,
  in_progress: 409,
  already_opened: 409,
  stage_locked: 409,
  quota_exceeded: 429,
};

function errorResponse(error: HintErrorCode) {
  return NextResponse.json<HintErrorResponse>(
    { error },
    { status: ERROR_STATUS[error] },
  );
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return errorResponse("unauthorized");

  let json: unknown;

  try {
    json = await request.json();
  } catch {
    return errorResponse("invalid_request");
  }

  const body = parseHintRequest(json);
  if (!body) return errorResponse("invalid_request");

  const problem = await getProblem(body.problemId);
  if (!problem) return errorResponse("problem_not_found");

  const admin = createAdminClient();

  const previousHints = await getPreviousHints(
    admin,
    user.id,
    problem.id,
    body.stage,
  );

  const messages = buildHintMessages({
    stage: body.stage,
    problem: { title: problem.title, description: problem.description },
    code: body.code,
    lastError: body.lastError,
    previousHints,
  });

  const { data, error } = await admin.rpc("start_hint_request", {
    p_user_id: user.id,
    p_problem_id: problem.id,
    p_stage: body.stage,
    p_code_version: body.codeVersion,
    p_daily_limit: HINT_DAILY_LIMIT,
  });

  if (error) {
    throw new Error(`힌트 요청 시작 실패: ${error.message}`);
  }

  const started = data[0];

  if (started?.reason && isHintRejectReason(started.reason)) {
    return errorResponse(started.reason);
  }

  if (!started?.request_id) {
    throw new Error("힌트 요청 기록을 만들지 못했어요");
  }

  const requestId = started.request_id;

  const ai = createAiClient();
  const encoder = new TextEncoder();
  const abortController = new AbortController();

  request.signal.addEventListener("abort", () => abortController.abort());
  if (request.signal.aborted) abortController.abort();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let content = "";
      let charged = false;

      function send(event: HintStreamEvent) {
        controller.enqueue(encoder.encode(encodeSse(event)));
      }

      async function finish(status: "completed" | "failed" | "aborted") {
        const { error } = await admin.rpc("finish_hint_request", {
          p_request_id: requestId,
          p_status: status,
          p_content: content,
        });
        if (error) console.error("힌트 기록 마무리 실패", error.message);
      }

      send({ type: "start", requestId });

      try {
        const completion = await ai.chat.completions.create(
          {
            model: AI_MODEL,
            messages,
            stream: true,
            temperature: 0.3,
            max_completion_tokens: 1024,
            ...(AI_MODEL.startsWith("openai/gpt-oss")
              ? { reasoning_effort: "low" as const }
              : {}),
          },
          { signal: abortController.signal },
        );

        for await (const chunk of completion) {
          const text = chunk.choices[0]?.delta?.content ?? "";

          if (!text) continue;

          if (!charged) {
            charged = true;
            const { error } = await admin.rpc("mark_hint_streaming", {
              p_request_id: requestId,
            });
            if (error) console.error("힌트 차감 실패", error.message);
          }

          content += text;
          send({ type: "delta", text });
        }

        if (!content) {
          await finish("failed");
          send({ type: "error" });
        } else {
          await finish("completed");
          send({ type: "done" });
        }
      } catch (error) {
        if (abortController.signal.aborted) {
          await finish("aborted");
        } else {
          console.error("힌트 생성 실패", error);
          await finish("failed");
          send({ type: "error" });
        }
      } finally {
        try {
          controller.close();
        } catch {}
      }
    },
    cancel() {
      abortController.abort();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}
