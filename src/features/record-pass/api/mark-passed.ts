"use server";

import { getCurrentUser } from "@/entities/session";
import { createClient } from "@/shared/api/supabase/server";

export async function markPassed(problemId: string): Promise<void> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("로그인이 필요해요");
  }

  if (typeof problemId !== "string" || problemId.length === 0) {
    throw new Error("문제 정보가 올바르지 않아요");
  }

  const supabase = await createClient();
  const { error } = await supabase.rpc("mark_problem_passed", {
    p_problem_id: problemId,
  });

  if (error) {
    throw new Error(`통과 기록 실패: ${error.message}`);
  }
}
