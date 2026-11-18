import type { ProblemTestCase } from "@/entities/problem";

export type LogLevel = "log" | "warn" | "error";

export type RunRequest = {
  runId: number;
  code: string;
  testCases: ProblemTestCase[];
};

export type TestStatus = "passed" | "failed" | "error";

export type TestResult = {
  index: number;
  status: TestStatus;
  inputText: string;
  expectedText: string;
  actualText: string | null;
  message: string | null;
  durationMs: number;
};

export type RunMessage =
  | { runId: number; type: "log"; level: LogLevel; text: string }
  | { runId: number; type: "test"; result: TestResult }
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
