"use server";

import { getMyCode, type SavedCode } from "@/entities/user-code";

export async function getSavedCode(
  problemId: string,
): Promise<SavedCode | null> {
  return await getMyCode(problemId);
}
