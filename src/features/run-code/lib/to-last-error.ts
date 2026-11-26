import type { RunResult, TestResult } from "../model/types";

export function toLastError(
  result: RunResult,
  tests: TestResult[],
): string | null {
  if (result.status === "error") {
    return result.errorMessage;
  }

  if (result.status === "timeout") {
    return `테스트 ${tests.length + 1} 실행 중 5초 시간 초과 (끝나지 않는 반복이나 재귀일 수 있음)`;
  }

  if (result.status !== "done") return null;

  const broken = tests.find((test) => test.status !== "passed");
  if (!broken) return null;

  const label = `테스트 ${broken.index + 1}`;

  if (broken.status === "error") {
    return `${label} 에러 · 입력 ${broken.inputText} · ${broken.message}`;
  }

  return `${label} 실패 · 입력 ${broken.inputText} · 기대값 ${broken.expectedText} · 실제값 ${broken.actualText}`;
}
