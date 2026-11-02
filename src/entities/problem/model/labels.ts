import type { ProblemStatus } from "./problem-status";
import type { ProblemLevel } from "./types";

export const PROBLEM_LEVEL_LABEL: Record<ProblemLevel, string> = {
  easy: "쉬움",
  normal: "보통",
  hard: "어려움",
};

export const PROBLEM_STATUS_LABEL: Record<ProblemStatus, string> = {
  todo: "시작 전",
  in_progress: "진행 중",
  passed: "통과",
};
