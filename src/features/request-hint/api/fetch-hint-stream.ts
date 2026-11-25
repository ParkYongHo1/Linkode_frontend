import { createSseParser, type SseEvent } from "@/shared/lib/sse-parser";

import type {
  HintErrorCode,
  HintRequestBody,
  HintStreamEvent,
} from "../model/types";

const HINT_ERROR_CODES: Record<HintErrorCode, true> = {
  unauthorized: true,
  invalid_request: true,
  problem_not_found: true,
  in_progress: true,
  already_opened: true,
  stage_locked: true,
  quota_exceeded: true,
};

function isHintErrorCode(value: unknown): value is HintErrorCode {
  return typeof value === "string" && Object.hasOwn(HINT_ERROR_CODES, value);
}

export class HintRequestError extends Error {
  readonly code: HintErrorCode;

  constructor(code: HintErrorCode) {
    super(code);
    this.name = "HintRequestError";
    this.code = code;
  }
}

async function readRejection(response: Response): Promise<never> {
  let body: unknown = null;

  try {
    body = await response.json();
  } catch {}

  if (typeof body === "object" && body !== null && "error" in body) {
    const { error } = body as { error: unknown };
    if (isHintErrorCode(error)) throw new HintRequestError(error);
  }

  throw new Error(`힌트 요청 실패: HTTP ${response.status}`);
}

function toHintEvent(sse: SseEvent): HintStreamEvent | null {
  const data = JSON.parse(sse.data) as Record<string, unknown>;

  if (sse.event === "start" && typeof data.requestId === "string") {
    return { type: "start", requestId: data.requestId };
  }
  if (sse.event === "delta" && typeof data.text === "string") {
    return { type: "delta", text: data.text };
  }
  if (sse.event === "done") return { type: "done" };
  if (sse.event === "error") return { type: "error" };

  return null;
}

export async function* fetchHintStream(
  body: HintRequestBody,
  signal: AbortSignal,
): AsyncGenerator<HintStreamEvent> {
  const response = await fetch("/api/hints", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal,
  });

  if (!response.ok || !response.body) {
    await readRejection(response);
  }

  const reader = response.body!.getReader();
  const parser = createSseParser();
  let finished = false;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    for (const sse of parser.push(value)) {
      const event = toHintEvent(sse);
      if (!event) continue;

      if (event.type === "done" || event.type === "error") finished = true;
      yield event;
    }
  }

  if (!finished) yield { type: "error" };
}
