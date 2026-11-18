import { useEffect, useRef, useState } from "react";

import type { ConsoleLine, RunMessage, RunResult } from "./types";

const TIMEOUT_MS = 5000;

const INITIAL_RESULT: RunResult = {
  status: "idle",
  durationMs: null,
  errorMessage: null,
};

export function useCodeRunner() {
  const [lines, setLines] = useState<ConsoleLine[]>([]);
  const [result, setResult] = useState<RunResult>(INITIAL_RESULT);
  const workerRef = useRef<Worker | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const runIdRef = useRef(0);

  function stop() {
    workerRef.current?.terminate();
    if (timerRef.current) clearTimeout(timerRef.current);
    workerRef.current = null;
    timerRef.current = null;
  }

  function run(code: string) {
    stop();

    const worker = new Worker(
      new URL("../lib/runner.worker.ts", import.meta.url),
      { type: "module" },
    );
    workerRef.current = worker;

    runIdRef.current = runIdRef.current + 1;

    const runId = runIdRef.current;

    setLines([]);

    setResult({ ...INITIAL_RESULT, status: "running" });

    timerRef.current = setTimeout(() => {
      stop();
      setResult({
        ...INITIAL_RESULT,
        status: "timeout",
        durationMs: TIMEOUT_MS,
      });
    }, TIMEOUT_MS);

    worker.onmessage = (event: MessageEvent<RunMessage>) => {
      const message = event.data;

      if (message.runId !== runIdRef.current) return;

      if (message.type === "log") {
        setLines((prev) => [
          ...prev,
          { level: message.level, text: message.text },
        ]);
        return;
      }

      if (message.type === "done") {
        setResult({
          ...INITIAL_RESULT,
          status: "done",
          durationMs: message.durationMs,
        });
      }

      if (message.type === "error") {
        setResult({
          ...INITIAL_RESULT,
          status: "error",
          errorMessage: message.message,
        });
      }

      stop();
    };

    worker.postMessage({ runId, code });
  }

  function cancel() {
    stop();
    setResult({ ...INITIAL_RESULT, status: "cancelled" });
  }

  useEffect(() => {
    return () => stop();
  }, []);

  return { lines, result, run, cancel };
}
