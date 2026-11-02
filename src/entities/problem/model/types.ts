import type { ProblemStatus } from "./problem-status";

export type ProblemLevel = "easy" | "normal" | "hard";

export type ProblemListItem = {
  id: string;
  number: string;
  title: string;
  topic: string;
  level: ProblemLevel;
  estimatedMinutes: number;
  status: ProblemStatus;
  statusText: string;
};
