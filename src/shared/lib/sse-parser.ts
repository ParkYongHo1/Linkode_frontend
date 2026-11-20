export type SseEvent = {
  event: string;
  data: string;
};

function parseBlock(block: string): SseEvent | null {
  let event = "message";
  const dataLines: string[] = [];

  for (const line of block.split("\n")) {
    if (line.startsWith(":")) continue;

    if (line.startsWith("event: ")) {
      event = line.slice(7);
      continue;
    }

    if (line.startsWith("data: ")) {
      dataLines.push(line.slice(6));
      continue;
    }
  }

  if (dataLines.length === 0) return null;

  return { event, data: dataLines.join("\n") };
}

export function createSseParser() {
  let buffer = "";
  const decoder = new TextDecoder();

  function push(chunk: Uint8Array): SseEvent[] {
    const text = decoder.decode(chunk, { stream: true });
    buffer += text;

    const blocks = buffer.split("\n\n");

    buffer = blocks.pop() ?? "";

    const events: SseEvent[] = [];

    for (const block of blocks) {
      const event = parseBlock(block);
      if (event) events.push(event);
    }

    return events;
  }

  return { push };
}
