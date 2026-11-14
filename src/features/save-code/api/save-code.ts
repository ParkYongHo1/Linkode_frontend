"use server";

import { getCurrentUser } from "@/entities/session";
import { createClient } from "@/shared/api/supabase/server";

export type SaveCodeInput = {
  problemId: string;
  code: string;
  baseVersion: number;
};

export type SaveCodeResult =
  { status: "saved"; version: number } | { status: "conflict" };

const MAX_CODE_LENGTH = 50000;

export async function saveCode(input: SaveCodeInput): Promise<SaveCodeResult> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("로그인이 필요해요");
  }

  if (
    typeof input.code !== "string" ||
    input.code.length > MAX_CODE_LENGTH ||
    !Number.isInteger(input.baseVersion) ||
    input.baseVersion < 0
  ) {
    throw new Error("저장할 수 없는 코드예요");
  }

  const supabase = await createClient();
  const { data, error } = await supabase.rpc("save_user_code", {
    p_problem_id: input.problemId,
    p_code: input.code,
    p_expected_version: input.baseVersion,
  });

  if (error) {
    throw new Error(`코드 저장 실패: ${error.message}`);
  }

  if (data === null) {
    return { status: "conflict" };
  }

  return { status: "saved", version: data };
}
