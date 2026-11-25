"use client";

import { useEffect, useRef, useState } from "react";

import { fetchHintStream, HintRequestError } from "../api/fetch-hint-stream";
import type { HintsByStage, StageHint } from "./hint-state";
import type { HintErrorCode, HintRequestBody, HintStage } from "./types";

export type HintRequestInput = Omit<HintRequestBody, "stage">;

export function useHintRequest(initialHints: HintsByStage = {}) {
  const [hints, setHints] = useState<HintsByStage>(initialHints);
  const [rejection, setRejection] = useState<HintErrorCode | null>(null);
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

  function restoreStage(stage: HintStage, previous: StageHint | undefined) {
    setHints((prev) => {
      const next = { ...prev };
      if (previous) next[stage] = previous;
      else delete next[stage];
      return next;
    });
  }

  async function request(stage: HintStage, input: HintRequestInput) {
    const previous = hints[stage];

    setRejection(null);
    setHints((prev) => ({
      ...prev,
      [stage]: {
        status: "streaming",
        text: "",
        codeVersion: input.codeVersion,
      },
    }));

    const controller = new AbortController();
    controllerRef.current = controller;
    streamingStageRef.current = stage;

    try {
      for await (const event of fetchHintStream(
        { ...input, stage },
        controller.signal,
      )) {
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
    } catch (error) {
      if (controller.signal.aborted) return;
      if (error instanceof HintRequestError) {
        restoreStage(stage, previous);
        setRejection(error.code);
        return;
      }
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

  return { hints, rejection, request, abort };
}
