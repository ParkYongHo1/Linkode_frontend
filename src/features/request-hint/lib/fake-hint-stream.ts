import type { HintStage, HintStreamEvent } from "../model/types";

const FAKE_TEXT: Record<HintStage, string> = {
  1: "이 문제는 **해시(Map)**로 한 번만 훑으면서 풀 수 있어요. 지금 코드는 이중 반복문으로 모든 쌍을 확인하는 방향이에요. 같은 원소를 두 번 쓰지 않는지 다시 살펴보세요.",
  2: "안쪽 반복문의 `j`가 `0`부터 시작해서, `i`와 `j`가 같은 경우도 검사하고 있어요. 그래서 `[3,3], 6`에서 같은 원소를 두 번 써서 `[0,0]`이 나와요.",
  3: "`for (let j = i + 1; j < nums.length; j++)`처럼 `i` 다음 칸부터 보게 바꿔보세요.",
};

const CHUNK_SIZE = 6;
const CHUNK_DELAY_MS = 100;

function sleep(ms: number, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    if (signal.aborted) {
      reject(new DOMException("Aborted", "AbortError"));
      return;
    }
    const timer = setTimeout(resolve, ms);
    signal.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });
}

export async function* fakeHintStream(
  stage: HintStage,
  signal: AbortSignal,
  options: { failAfter?: number } = {},
): AsyncGenerator<HintStreamEvent> {
  yield { type: "start", requestId: "fake" };

  const text = FAKE_TEXT[stage];

  for (let index = 0; index < text.length; index += CHUNK_SIZE) {
    await sleep(CHUNK_DELAY_MS, signal);

    if (options.failAfter !== undefined && index >= options.failAfter) {
      yield { type: "error" };
      return;
    }

    yield { type: "delta", text: text.slice(index, index + CHUNK_SIZE) };
  }

  yield { type: "done" };
}
