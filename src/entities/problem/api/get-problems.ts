import "server-only";

import { createClient } from "@/shared/api/supabase/server";

import { isProblemLevel } from "../model/problem-level";
import type { ProblemSummary } from "../model/types";

export async function getProblems(): Promise<ProblemSummary[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("problems")
    .select("id, code, title, topic, level, estimated_minutes")
    .order("sort_order");

  if (error) {
    throw new Error(`문제 목록 조회 실패: ${error.message}`);
  }

  return data.map((row) => {
    if (!isProblemLevel(row.level)) {
      throw new Error(`알 수 없는 난이도: ${row.level} (문제 ${row.code})`);
    }

    return {
      id: row.id,
      number: row.code,
      title: row.title,
      topic: row.topic,
      level: row.level,
      estimatedMinutes: row.estimated_minutes,
    };
  });
}
