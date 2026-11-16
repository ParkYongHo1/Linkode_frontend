import type { LogLevel, RunMessage, RunRequest } from "../model/types";

function post(message: RunMessage) {
  (self as unknown as Worker).postMessage(message);
}

function formatValue(value: unknown): string {
  if (typeof value === "string") return value;
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

self.onmessage = (event: MessageEvent<RunRequest>) => {
  const { runId, code } = event.data;

  function capture(level: LogLevel) {
    return function (...args: unknown[]) {
      post({
        runId,
        type: "log",
        level,
        text: args.map((value) => formatValue(value)).join(" "),
      });
    };
  }

  console.log = capture("log");
  console.warn = capture("warn");
  console.error = capture("error");

  const start = self.performance.now();

  try {
    new Function(code)();
    post({ runId, type: "done", durationMs: self.performance.now() - start });
  } catch (error) {
    post({
      runId,
      type: "error",
      message:
        error instanceof Error
          ? `${error.name}: ${error.message}`
          : String(error),
    });
  }
};
