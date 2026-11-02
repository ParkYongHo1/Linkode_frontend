export const PROBLEM_STATUSES = ["todo", "in_progress", "passed"] as const;

export type ProblemStatus = (typeof PROBLEM_STATUSES)[number];

export function isProblemStatus(value: string): value is ProblemStatus {
  return (PROBLEM_STATUSES as readonly string[]).includes(value);
}
