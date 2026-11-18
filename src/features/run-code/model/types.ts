export type LogLevel = "log" | "warn" | "error";

export type RunRequest = {
  runId: number;
  code: string;
};

export type RunMessage =
  | { runId: number; type: "log"; level: LogLevel; text: string }
  | { runId: number; type: "done"; durationMs: number }
  | { runId: number; type: "error"; message: string };

export type ConsoleLine = {
  level: LogLevel;
  text: string;
};

export type RunStatus =
  "idle" | "running" | "done" | "error" | "timeout" | "cancelled";

export type RunResult = {
  status: RunStatus;
  durationMs: number | null;
  errorMessage: string | null;
};
