import type { ProblemStatus } from "@/entities/problem";

export type ProblemProgress = {
  problemId: string;
  status: Exclude<ProblemStatus, "todo">;
  passedAt: string | null;
  updatedAt: string;
};
