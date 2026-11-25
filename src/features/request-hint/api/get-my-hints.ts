import "server-only";

import { cache } from "react";

import { getCurrentUser } from "@/entities/session";
import { createClient } from "@/shared/api/supabase/server";

import type { HintsByStage, StageHint } from "../model/hint-state";
import type { HintStage } from "../model/types";

export const getMyHints = cache(
  async (problemId: string): Promise<HintsByStage> => {
    const user = await getCurrentUser();
    if (!user) return {};

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("hint_requests")
      .select("stage, status, content, code_version")
      .eq("problem_id", problemId)
      .in("status", ["completed", "aborted", "failed"])
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(`힌트 기록 조회 실패: ${error.message}`);
    }

    const hints: HintsByStage = {};

    for (const row of data) {
      const stage = row.stage as HintStage;
      const current = hints[stage];

      const isFirst = !current;
      const replacesWithCompleted =
        current?.status !== "completed" && row.status === "completed";

      if (!isFirst && !replacesWithCompleted) continue;

      hints[stage] = {
        status: row.status as StageHint["status"],
        text: row.content ?? "",
        codeVersion: row.code_version,
      };
    }

    return hints;
  },
);
