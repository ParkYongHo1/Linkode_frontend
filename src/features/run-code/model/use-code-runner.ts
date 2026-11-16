import { useEffect, useRef, useState } from "react";

import type { ConsoleLine, RunMessage, RunResult } from "./types";

const INITIAL_RESULT: RunResult = {
  status: "idle",
  durationMs: null,
  errorMessage: null,
};

export function useCodeRunner() {
  const [lines, setLines] = useState<ConsoleLine[]>([]);
  const [result, setResult] = useState<RunResult>(INITIAL_RESULT);
  const workerRef = useRef<Worker | null>(null);
  const runIdRef = useRef(0);

  function run(code: string) {
    workerRef.current?.terminate();

    const worker = new Worker(
      new URL("../lib/runner.worker.ts", import.meta.url),
      { type: "module" },
    );
    workerRef.current = worker;

    runIdRef.current = runIdRef.current + 1;

    setLines([]);

    setResult({ ...INITIAL_RESULT, status: "running" });

    worker.onmessage = (event: MessageEvent<RunMessage>) => {
      const message = event.data;

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

      worker.terminate();
    };

    worker.postMessage({ runId: runIdRef.current, code });
  }

  useEffect(() => {
    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  return { lines, result, run };
}
