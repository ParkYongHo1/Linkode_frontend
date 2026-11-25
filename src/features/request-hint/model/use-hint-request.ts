"use client";

import { useEffect, useRef, useState } from "react";

import { fakeHintStream } from "../lib/fake-hint-stream";
import type { HintsByStage, StageHint } from "./hint-state";
import type { HintStage } from "./types";

export function useHintRequest() {
  const [hints, setHints] = useState<HintsByStage>({});
  const controllerRef = useRef<AbortController | null>(null);
  const streamingStageRef = useRef<HintStage | null>(null);

  function updateStage(
    stage: HintStage,
    update: (hint: StageHint) => StageHint,
  ) {
    setHints((prev) => {
      const current = prev[stage];
      if (!current) return prev;
      return { ...prev, [stage]: update(current) };
    });
  }

  async function request(stage: HintStage, codeVersion: number) {
    setHints((prev) => ({
      ...prev,
      [stage]: { status: "streaming", text: "", codeVersion },
    }));

    const controller = new AbortController();
    controllerRef.current = controller;
    streamingStageRef.current = stage;

    try {
      for await (const event of fakeHintStream(stage, controller.signal)) {
        if (event.type === "delta") {
          updateStage(stage, (hint) => ({
            ...hint,
            text: hint.text + event.text,
          }));
        }

        if (event.type === "done") {
          updateStage(stage, (hint) => ({ ...hint, status: "completed" }));
        }

        if (event.type === "error") {
          updateStage(stage, (hint) => ({ ...hint, status: "failed" }));
        }
      }
    } catch {
      if (controller.signal.aborted) return;
      updateStage(stage, (hint) => ({ ...hint, status: "failed" }));
    } finally {
      if (controllerRef.current === controller) {
        controllerRef.current = null;
        streamingStageRef.current = null;
      }
    }
  }

  function abort() {
    if (streamingStageRef.current) {
      updateStage(streamingStageRef.current, (hint) => ({
        ...hint,
        status: "aborted",
      }));
    }
    controllerRef.current?.abort();
  }

  useEffect(() => {
    return () => controllerRef.current?.abort();
  }, []);

  return { hints, request, abort };
}
