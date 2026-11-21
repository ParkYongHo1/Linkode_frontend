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
