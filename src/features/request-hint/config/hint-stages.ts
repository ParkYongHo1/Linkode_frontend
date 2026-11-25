import type { HintStage } from "../model/types";

export const HINT_STAGES: readonly HintStage[] = [1, 2, 3];

export const HINT_STAGE_LABEL: Record<HintStage, string> = {
  1: "방향",
  2: "위치",
  3: "거의 정답",
};
