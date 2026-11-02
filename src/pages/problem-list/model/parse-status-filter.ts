import { isProblemStatus } from "@/entities/problem";
import type { ProblemStatusFilter } from "@/widgets/problem-table";

export function parseStatusFilter(
  value: string | string[] | undefined,
): ProblemStatusFilter {
  if (Array.isArray(value)) return "all";
  if (typeof value === "string" && isProblemStatus(value)) return value;
  return "all";
}
