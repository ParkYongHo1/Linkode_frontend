"use client";

import {
  HintPanel,
  useHintRequest,
  type HintsByStage,
} from "@/features/request-hint";

type HintPanelDemoProps = {
  problemId: string;
  isLoggedIn: boolean;
  initialHints: HintsByStage;
  initialRemaining: number;
};

export function HintPanelDemo({
  problemId,
  isLoggedIn,
  initialHints,
  initialRemaining,
}: HintPanelDemoProps) {
  const { hints, remaining, rejection, request, abort } = useHintRequest({
    initialHints,
    initialRemaining,
  });

  return (
    <HintPanel
      hints={hints}
      rejection={rejection}
      currentVersion={0}
      isLoggedIn={isLoggedIn}
      remaining={remaining}
      onRequest={(stage) =>
        request(stage, {
          problemId,
          code: "function solution(nums, target) {\n  for (let i = 0; i < nums.length; i++) {\n    for (let j = 0; j < nums.length; j++) {\n      if (nums[i] + nums[j] === target) return [i, j];\n    }\n  }\n}",
          lastError:
            "테스트 3 실패 · 입력 [3,3], 6 · 기대값 [0,1] · 실제값 [0,0]",
          codeVersion: 0,
        })
      }
      onAbort={abort}
    />
  );
}
