export type HintStage = 1 | 2 | 3;

export type HintPromptInput = {
  stage: HintStage;
  problem: {
    title: string;
    description: string;
  };
  code: string;
  lastError: string | null;
  previousHints: string[];
};

export type HintMessage = {
  role: "system" | "user";
  content: string;
};

export type HintRequestBody = {
  problemId: string;
  stage: HintStage;
  code: string;
  lastError: string | null;
  codeVersion: number;
};

export type HintErrorCode =
  | "unauthorized"
  | "invalid_request"
  | "problem_not_found"
  | "in_progress"
  | "already_opened"
  | "stage_locked"
  | "quota_exceeded";

export type HintErrorResponse = {
  error: HintErrorCode;
};

export type HintStreamEvent =
  | { type: "start"; requestId: string }
  | { type: "delta"; text: string }
  | { type: "done" }
  | { type: "error" };
