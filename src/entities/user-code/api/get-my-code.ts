import "server-only";

import { cache } from "react";

import { getCurrentUser } from "@/entities/session";
import { createClient } from "@/shared/api/supabase/server";

import type { SavedCode } from "../model/types";

export const getMyCode = cache(
  async (problemId: string): Promise<SavedCode | null> => {
    const user = await getCurrentUser();

    if (!user) {
      return null;
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from("user_codes")
      .select("code, version")
      .eq("problem_id", problemId)
      .maybeSingle();

    if (error) {
      throw new Error(`저장된 코드 조회 실패: ${error.message}`);
    }

    if (!data) {
      return null;
    }

    return {
      code: data.code,
      version: data.version,
    };
  },
);
