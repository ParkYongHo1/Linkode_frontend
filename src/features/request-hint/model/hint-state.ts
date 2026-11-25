import type { HintStage } from "./types";

export type HintStatus = "streaming" | "completed" | "failed" | "aborted";

export type StageHint = {
  status: HintStatus;
  text: string;
  codeVersion: number;
};

export type HintsByStage = Partial<Record<HintStage, StageHint>>;
