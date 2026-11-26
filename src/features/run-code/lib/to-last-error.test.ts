import { describe, expect, it } from "vitest";

import type { RunResult, TestResult } from "../model/types";
import { toLastError } from "./to-last-error";

const DONE: RunResult = { status: "done", durationMs: 10, errorMessage: null };

function test(overrides: Partial<TestResult>): TestResult {
  return {
    index: 0,
    status: "passed",
    inputText: "[2,7,11,15], 9",
    expectedText: "[0,1]",
    actualText: "[0,1]",
    message: null,
    durationMs: 1,
    ...overrides,
  };
}

describe("toLastError", () => {
  it("실행 전이거나 실행 중이면 null이다", () => {
    expect(
      toLastError({ status: "idle", durationMs: null, errorMessage: null }, []),
    ).toBeNull();
    expect(
      toLastError(
        { status: "running", durationMs: null, errorMessage: null },
        [],
      ),
    ).toBeNull();
  });

  it("코드 전체가 에러로 끝나면 그 메시지를 쓴다", () => {
    expect(
      toLastError(
        {
          status: "error",
          durationMs: null,
          errorMessage: "SyntaxError: Unexpected token",
        },
        [],
      ),
    ).toBe("SyntaxError: Unexpected token");
  });

  it("시간 초과면 몇 번째 테스트에서 멈췄는지 알려준다", () => {
    expect(
      toLastError({ status: "timeout", durationMs: 5000, errorMessage: null }, [
        test({ index: 0 }),
      ]),
    ).toBe(
      "테스트 2 실행 중 5초 시간 초과 (끝나지 않는 반복이나 재귀일 수 있음)",
    );
  });

  it("모두 통과하면 null이다", () => {
    expect(toLastError(DONE, [test({}), test({ index: 1 })])).toBeNull();
  });

  it("처음 실패한 테스트의 입력, 기대값, 실제값을 쓴다", () => {
    const tests = [
      test({ index: 0 }),
      test({
        index: 1,
        status: "failed",
        inputText: "[3,3], 6",
        expectedText: "[0,1]",
        actualText: "[0,0]",
      }),
      test({ index: 2, status: "failed" }),
    ];

    expect(toLastError(DONE, tests)).toBe(
      "테스트 2 실패 · 입력 [3,3], 6 · 기대값 [0,1] · 실제값 [0,0]",
    );
  });

  it("테스트 안에서 에러가 나면 에러 메시지를 쓴다", () => {
    const tests = [
      test({
        index: 0,
        status: "error",
        actualText: null,
        message: "TypeError: nums is undefined",
      }),
    ];

    expect(toLastError(DONE, tests)).toBe(
      "테스트 1 에러 · 입력 [2,7,11,15], 9 · TypeError: nums is undefined",
    );
  });
});
