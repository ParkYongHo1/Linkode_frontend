import { describe, expect, it } from "vitest";

import { createSseParser } from "@/shared/lib/sse-parser";

import { encodeSse } from "./encode-sse";

describe("encodeSse", () => {
  it("type은 event 줄로, 나머지는 data 줄의 JSON으로 만든다", () => {
    expect(encodeSse({ type: "delta", text: "안녕" })).toBe(
      'event: delta\ndata: {"text":"안녕"}\n\n',
    );
  });

  it("데이터가 없는 이벤트는 빈 객체를 보낸다", () => {
    expect(encodeSse({ type: "done" })).toBe("event: done\ndata: {}\n\n");
  });

  it("줄바꿈이 든 글자도 data 한 줄로 보낸다", () => {
    expect(encodeSse({ type: "delta", text: "a\n\nb" })).toBe(
      'event: delta\ndata: {"text":"a\\n\\nb"}\n\n',
    );
  });

  it("SSE 파서로 다시 읽으면 같은 이벤트가 나온다", () => {
    const parser = createSseParser();
    const bytes = new TextEncoder().encode(
      encodeSse({ type: "start", requestId: "r1" }) +
        encodeSse({ type: "delta", text: "BFS로\n최단 거리" }),
    );

    const events = parser
      .push(bytes)
      .map((event) => ({ type: event.event, ...JSON.parse(event.data) }));

    expect(events).toEqual([
      { type: "start", requestId: "r1" },
      { type: "delta", text: "BFS로\n최단 거리" },
    ]);
  });
});
