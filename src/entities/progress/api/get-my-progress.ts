import "server-only";

import { isProblemStatus } from "@/entities/problem";
import { createClient } from "@/shared/api/supabase/server";

import type { ProblemProgress } from "../model/types";

export async function getMyProgress(): Promise<ProblemProgress[]> {
  const supabase = await createClient();

  const { data: auth } = await supabase.auth.getClaims();

  if (!auth?.claims) {
    return [];
  }
  const { data, error } = await supabase
    .from("user_progress")
    .select("problem_id, status, passed_at, updated_at");

  if (error) {
    throw new Error(`진행 기록 조회 실패: ${error.message}`);
  }

  return data.map((row) => {
    if (!isProblemStatus(row.status) || row.status === "todo") {
      throw new Error(`알 수 없는 진행 상태: ${row.status}`);
    }

    return {
      problemId: row.problem_id,
      status: row.status,
      passedAt: row.passed_at,
      updatedAt: row.updated_at,
    };
  });
}
