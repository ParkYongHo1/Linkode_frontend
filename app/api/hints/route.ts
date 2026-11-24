import { NextResponse } from "next/server";

import { getProblem } from "@/entities/problem";
import { getCurrentUser } from "@/entities/session";
import {
  HINT_DAILY_LIMIT,
  isHintRejectReason,
  parseHintRequest,
  type HintErrorCode,
  type HintErrorResponse,
} from "@/features/request-hint";
import { createAdminClient } from "@/shared/api/supabase/admin";

export const maxDuration = 60;

const ERROR_STATUS: Record<HintErrorCode, number> = {
  unauthorized: 401,
  invalid_request: 400,
  problem_not_found: 404,
  in_progress: 409,
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
  const { data, error } = await admin.rpc("start_hint_request", {
    p_user_id: user.id,
    p_problem_id: body.problemId,
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

  return NextResponse.json({ requestId: started.request_id });
}
