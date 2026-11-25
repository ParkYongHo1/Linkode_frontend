import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/shared/api/supabase/database-types";

import type { HintStage } from "../model/types";

export async function getPreviousHints(
  admin: SupabaseClient<Database>,
  userId: string,
  problemId: string,
  stage: HintStage,
): Promise<string[]> {
  const { data, error } = await admin
    .from("hint_requests")
    .select("stage, content")
    .eq("user_id", userId)
    .eq("problem_id", problemId)
    .eq("status", "completed")
    .lt("stage", stage)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`앞 단계 힌트 조회 실패: ${error.message}`);
  }

  const latestByStage = new Map<number, string>();

  for (const row of data) {
    if (row.content === null) continue;

    if (latestByStage.has(row.stage)) continue;

    latestByStage.set(row.stage, row.content);
  }

  return [...latestByStage.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([, content]) => content);
}
