import {
  PROBLEM_STATUS_LABEL,
  type ProblemListItem,
  type ProblemStatus,
  type ProblemSummary,
} from "@/entities/problem";
import type { ProblemProgress } from "@/entities/progress";
import { formatMonthDay } from "@/shared/lib/format-date";

function getStatusText(progress: ProblemProgress | undefined): string {
  if (!progress) {
    return PROBLEM_STATUS_LABEL.todo;
  } else if (progress.status === "in_progress") {
    return `${PROBLEM_STATUS_LABEL.in_progress} · ${formatMonthDay(progress?.updatedAt)}`;
  }
  return progress.passedAt
    ? `${PROBLEM_STATUS_LABEL.passed} · ${formatMonthDay(progress.passedAt)}`
    : PROBLEM_STATUS_LABEL.passed;
}

export function toProblemListItem(
  problem: ProblemSummary,
  progress: ProblemProgress | undefined,
): ProblemListItem {
  const status: ProblemStatus = progress?.status ?? "todo";

  return {
    ...problem,
    status,
    statusText: getStatusText(progress),
  };
}
