import { describe, expect, it } from "vitest";

import { deepEqual } from "./deep-equal";

describe("deepEqual", () => {
  it("같은 원시값은 같다", () => {
    expect(deepEqual(1, 1)).toBe(true);
    expect(deepEqual("a", "a")).toBe(true);
    expect(deepEqual(null, null)).toBe(true);
  });

  it("타입이 다르면 다르다", () => {
    expect(deepEqual(1, "1")).toBe(false);
    expect(deepEqual(null, {})).toBe(false);
    expect(deepEqual(undefined, null)).toBe(false);
  });

  it("배열은 길이와 순서까지 같아야 같다", () => {
    expect(deepEqual([0, 1], [0, 1])).toBe(true);
    expect(deepEqual([0, 1], [1, 0])).toBe(false);
    expect(deepEqual([1], [1, 2])).toBe(false);
  });

  it("중첩 배열도 안쪽까지 비교한다", () => {
    expect(deepEqual([[1, 2], [3]], [[1, 2], [3]])).toBe(true);
    expect(deepEqual([[1, 2], [3]], [[1, 2], [4]])).toBe(false);
  });

  it("객체는 키 순서와 상관없이 키와 값이 같으면 같다", () => {
    expect(deepEqual({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true);
    expect(deepEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false);
  });

  it("배열과 객체는 비어 있어도 다르다", () => {
    expect(deepEqual([], {})).toBe(false);
    expect(deepEqual([1], { 0: 1 })).toBe(false);
  });
});
