import type { ProblemTestCase } from "@/entities/problem";

import type {
  LogLevel,
  RunMessage,
  RunRequest,
  TestResult,
} from "../model/types";
import { deepEqual } from "./deep-equal";

type Solution = (...args: unknown[]) => unknown;

const NO_SOLUTION_MESSAGE = "solution 함수를 찾을 수 없어요";

function post(message: RunMessage) {
  (self as unknown as Worker).postMessage(message);
}

function formatValue(value: unknown): string {
  if (typeof value === "string") return value;
  try {
    return JSON.stringify(value) ?? String(value);
  } catch {
    return String(value);
  }
}

function toErrorMessage(error: unknown): string {
  return error instanceof Error
    ? `${error.name}: ${error.message}`
    : String(error);
}

function loadSolution(code: string): Solution | null {
  const wrappedCode =
    code + "\nreturn typeof solution === 'function' ? solution : undefined;";
  const studentSolution = new Function(wrappedCode)();

  if (typeof studentSolution !== "function") return null;
  return studentSolution;
}

function runTest(
  solution: Solution,
  testCase: ProblemTestCase,
  index: number,
): TestResult {
  const inputText = testCase.args.map((value) => formatValue(value)).join(", ");
  const expectedText = formatValue(testCase.expected);
  const start = self.performance.now();

  try {
    const args = structuredClone(testCase.args);
    const actual = solution(...args);
    const isPassed = deepEqual(actual, testCase.expected);

    return {
      index,
      status: isPassed ? "passed" : "failed",
      inputText,
      expectedText,
      actualText: formatValue(actual),
      message: null,
      durationMs: self.performance.now() - start,
    };
  } catch (error) {
    return {
      index,
      status: "error",
      inputText,
      expectedText,
      actualText: null,
      message: toErrorMessage(error),
      durationMs: self.performance.now() - start,
    };
  }
}

self.onmessage = (event: MessageEvent<RunRequest>) => {
  const { runId, code, testCases } = event.data;

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
    const solution = loadSolution(code);

    if (!solution) {
      post({ runId, type: "error", message: NO_SOLUTION_MESSAGE });
      return;
    }

    for (const [index, testCase] of testCases.entries()) {
      const result = runTest(solution, testCase, index);
      post({ runId, type: "test", result });
    }

    post({ runId, type: "done", durationMs: self.performance.now() - start });
  } catch (error) {
    post({ runId, type: "error", message: toErrorMessage(error) });
  }
};
