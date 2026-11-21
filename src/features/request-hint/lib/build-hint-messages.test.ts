import { describe, expect, it } from "vitest";

import type { HintPromptInput } from "../model/types";
import { buildHintMessages } from "./build-hint-messages";

const BASE_INPUT: HintPromptInput = {
  stage: 1,
  problem: { title: "두 수의 합", description: "정수 배열이 주어져요." },
  code: "function solution(nums, target) {}",
  lastError: null,
  previousHints: [],
};

describe("buildHintMessages", () => {
  it("system과 user 메시지 두 개를 돌려준다", () => {
    const messages = buildHintMessages(BASE_INPUT);

    expect(messages).toHaveLength(2);
    expect(messages[0].role).toBe("system");
    expect(messages[1].role).toBe("user");
  });

  it("system에 이번 단계 규칙이 들어간다", () => {
    const [system] = buildHintMessages({ ...BASE_INPUT, stage: 2 });

    expect(system.content).toContain("이번은 2단계(위치) 힌트예요.");
    expect(system.content).not.toContain("이번은 1단계(방향) 힌트예요.");
  });

  it("요청 문장에 이번 단계 번호가 들어간다", () => {
    const [, user] = buildHintMessages({ ...BASE_INPUT, stage: 2 });

    expect(user.content).toContain("2단계 힌트를 주세요.");
  });

  it("학생 코드는 student_code 태그 안에 들어간다", () => {
    const [, user] = buildHintMessages(BASE_INPUT);

    expect(user.content).toContain(
      `<student_code>\n${BASE_INPUT.code}\n</student_code>`,
    );
  });

  it("에러가 없으면 last_error 태그가 없다", () => {
    const [, user] = buildHintMessages(BASE_INPUT);

    expect(user.content).not.toContain("<last_error>");
  });

  it("에러가 있으면 last_error 태그 안에 들어간다", () => {
    const [, user] = buildHintMessages({
      ...BASE_INPUT,
      lastError: "TypeError: nums is undefined",
    });

    expect(user.content).toContain(
      "<last_error>\nTypeError: nums is undefined\n</last_error>",
    );
  });

  it("앞 단계 힌트가 없으면 previous_hints 태그가 없다", () => {
    const [, user] = buildHintMessages(BASE_INPUT);

    expect(user.content).not.toContain("<previous_hints>");
  });

  it("앞 단계 힌트가 있으면 단계 번호와 함께 전부 들어간다", () => {
    const [, user] = buildHintMessages({
      ...BASE_INPUT,
      stage: 3,
      previousHints: ["Map을 써보세요.", "set 위치를 보세요."],
    });

    expect(user.content).toContain("<previous_hints>");
    expect(user.content).toContain("1단계: Map을 써보세요.");
    expect(user.content).toContain("2단계: set 위치를 보세요.");
  });
});
