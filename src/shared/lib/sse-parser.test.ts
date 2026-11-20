import { describe, expect, it } from "vitest";

import { createSseParser } from "./sse-parser";

const encoder = new TextEncoder();

function toBytes(text: string) {
  return encoder.encode(text);
}

describe("createSseParser", () => {
  it("이벤트 하나가 한 번에 오면 그대로 읽는다", () => {
    const parser = createSseParser();

    const events = parser.push(
      toBytes('event: delta\ndata: {"text":"hi"}\n\n'),
    );

    expect(events).toEqual([{ event: "delta", data: '{"text":"hi"}' }]);
  });

  it("event 줄이 없으면 이벤트 이름은 message다", () => {
    const parser = createSseParser();

    const events = parser.push(toBytes('data: {"text":"hi"}\n\n'));

    expect(events).toEqual([{ event: "message", data: '{"text":"hi"}' }]);
  });

  it("한 청크에 이벤트가 두 개 오면 둘 다 읽는다", () => {
    const parser = createSseParser();

    const events = parser.push(
      toBytes(
        'event: delta\ndata: {"text":"hi"}\n\nevent: delta\ndata: {"text":"bye"}\n\n',
      ),
    );

    expect(events).toEqual([
      { event: "delta", data: '{"text":"hi"}' },
      { event: "delta", data: '{"text":"bye"}' },
    ]);
  });

  it("완성된 이벤트는 바로 읽고, 덜 온 이벤트는 다 모였을 때 읽는다", () => {
    const parser = createSseParser();

    const events1 = parser.push(
      toBytes('event: delta\ndata: {"text":"hi"}\n\nevent: delta\ndata: '),
    );
    expect(events1).toEqual([{ event: "delta", data: '{"text":"hi"}' }]);

    const events2 = parser.push(toBytes('{"text":"bye"}\n\n'));
    expect(events2).toEqual([{ event: "delta", data: '{"text":"bye"}' }]);
  });

  it("한글 바이트가 청크 경계에서 잘려도 깨지지 않는다", () => {
    const parser = createSseParser();
    const bytes = toBytes("data: 안녕\n\n");
    const first = bytes.slice(0, 7);
    const second = bytes.slice(7);

    const events1 = parser.push(first);
    expect(events1).toEqual([]);

    const events2 = parser.push(second);
    expect(events2).toEqual([{ event: "message", data: "안녕" }]);
  });

  it(":로 시작하는 주석 줄은 무시한다", () => {
    const parser = createSseParser();

    const events = parser.push(
      toBytes(': this is a comment\nevent: delta\ndata: {"text":"hi"}\n\n'),
    );

    expect(events).toEqual([{ event: "delta", data: '{"text":"hi"}' }]);
  });

  it("주석만 있는 블록은 이벤트를 만들지 않는다", () => {
    const parser = createSseParser();

    const events = parser.push(toBytes(": keep-alive\n\n"));

    expect(events).toEqual([]);
  });

  it("event 줄의 이름을 그대로 읽는다", () => {
    const parser = createSseParser();

    const events = parser.push(toBytes("event: done\ndata: {}\n\n"));

    expect(events).toEqual([{ event: "done", data: "{}" }]);
  });
});
