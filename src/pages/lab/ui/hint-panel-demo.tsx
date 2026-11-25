"use client";

import { HintPanel, useHintRequest } from "@/features/request-hint";

export function HintPanelDemo() {
  const { hints, request, abort } = useHintRequest();

  return (
    <HintPanel
      hints={hints}
      currentVersion={0}
      isLoggedIn
      remaining={10}
      onRequest={(stage) => request(stage, 0)}
      onAbort={abort}
    />
  );
}
