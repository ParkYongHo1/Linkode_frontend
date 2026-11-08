import type { ProblemLevel } from "./problem-level";
import type { ProblemStatus } from "./problem-status";

export type ProblemSummary = {
  id: string;
  number: string;
  title: string;
  topic: string;
  level: ProblemLevel;
  estimatedMinutes: number;
};

export type ProblemListItem = ProblemSummary & {
  status: ProblemStatus;
  statusText: string;
};
