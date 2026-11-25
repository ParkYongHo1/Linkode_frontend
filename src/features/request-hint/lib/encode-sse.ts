import type { HintStreamEvent } from "../model/types";

export function encodeSse(event: HintStreamEvent): string {
  const { type, ...data } = event;
  return `event: ${type}\ndata: ${JSON.stringify(data)}\n\n`;
}
