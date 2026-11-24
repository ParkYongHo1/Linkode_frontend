import { describe, expect, it } from "vitest";

import {
  MAX_HINT_CODE_LENGTH,
  MAX_HINT_ERROR_LENGTH,
} from "../config/hint-limits";
import { parseHintRequest } from "./parse-hint-request";

const VALID_BODY = {
  problemId: "00000000-0000-0000-0000-000000000001",
  stage: 1,
  code: "function solution() {}",
  lastError: null,
  codeVersion: 0,
};

describe("parseHintRequest", () => {
  it("올바른 본문이면 그대로 돌려준다", () => {
    expect(parseHintRequest(VALID_BODY)).toEqual(VALID_BODY);
  });

  it("객체가 아니면 null이다", () => {
    expect(parseHintRequest("hello")).toBeNull();
    expect(parseHintRequest(null)).toBeNull();
  });

  it("problemId가 빈 문자열이면 null이다", () => {
    expect(parseHintRequest({ ...VALID_BODY, problemId: "" })).toBeNull();
  });

  it("stage가 1~3이 아니면 null이다", () => {
    expect(parseHintRequest({ ...VALID_BODY, stage: 0 })).toBeNull();
    expect(parseHintRequest({ ...VALID_BODY, stage: 4 })).toBeNull();
    expect(parseHintRequest({ ...VALID_BODY, stage: "1" })).toBeNull();
  });

  it("코드가 최대 길이를 넘으면 null이다", () => {
    const code = "a".repeat(MAX_HINT_CODE_LENGTH + 1);

    expect(parseHintRequest({ ...VALID_BODY, code })).toBeNull();
  });

  it("lastError가 최대 길이 이하의 문자열이면 받는다", () => {
    const body = { ...VALID_BODY, lastError: "TypeError: x is undefined" };

    expect(parseHintRequest(body)).toEqual(body);
  });

  it("lastError가 최대 길이를 넘으면 null이다", () => {
    const lastError = "a".repeat(MAX_HINT_ERROR_LENGTH + 1);

    expect(parseHintRequest({ ...VALID_BODY, lastError })).toBeNull();
  });

  it("codeVersion이 음수거나 소수면 null이다", () => {
    expect(parseHintRequest({ ...VALID_BODY, codeVersion: -1 })).toBeNull();
    expect(parseHintRequest({ ...VALID_BODY, codeVersion: 1.5 })).toBeNull();
  });
});
