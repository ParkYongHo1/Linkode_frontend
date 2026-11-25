import "server-only";

import { cache } from "react";

import { getCurrentUser } from "@/entities/session";
import { createClient } from "@/shared/api/supabase/server";

import { HINT_DAILY_LIMIT } from "../config/hint-limits";

const SEOUL_OFFSET_MS = 9 * 60 * 60 * 1000;

function startOfTodayInSeoul(now: number): string {
  const seoul = new Date(now + SEOUL_OFFSET_MS);
  seoul.setUTCHours(0, 0, 0, 0);
  return new Date(seoul.getTime() - SEOUL_OFFSET_MS).toISOString();
}

export const getMyHintRemaining = cache(async (): Promise<number> => {
  const user = await getCurrentUser();
  if (!user) return 0;

  const supabase = await createClient();
  const { count, error } = await supabase
    .from("hint_requests")
    .select("id", { count: "exact", head: true })
    .eq("charged", true)
    .gte("created_at", startOfTodayInSeoul(Date.now()));

  if (error) {
    throw new Error(`힌트 사용 횟수 조회 실패: ${error.message}`);
  }

  return Math.max(0, HINT_DAILY_LIMIT - (count ?? 0));
});
