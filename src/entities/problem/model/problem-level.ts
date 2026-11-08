export const PROBLEM_LEVELS = ["easy", "normal", "hard"] as const;

export type ProblemLevel = (typeof PROBLEM_LEVELS)[number];

export function isProblemLevel(value: string): value is ProblemLevel {
  return (PROBLEM_LEVELS as readonly string[]).includes(value);
}
