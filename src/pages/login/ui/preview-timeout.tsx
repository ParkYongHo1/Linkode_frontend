import { CodeLine } from "./code-line";
import { PreviewFrame } from "./preview-frame";

const LINES = [
  "function countSteps(maze) {",
  "  let steps = 0;",
  "  let r = 0;",
  "  while (r < maze.length) {",
  "    steps += 1;",
  "    console.log('steps:', steps);",
  "  }",
  "  return steps;",
  "}",
];

const OUTPUT = ["steps: 1", "steps: 2", "steps: 3", "steps: 48213 …"];

export function PreviewTimeout() {
  return (
    <PreviewFrame
      meta="저장됨 · 버전 3"
      side={
        <>
          <span className="text-xs font-semibold">콘솔</span>
          <div aria-hidden="true" className="font-mono text-xs leading-5 text-body">
            {OUTPUT.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
          <p className="mt-auto flex items-start gap-2 text-xs leading-[19px]">
            <span aria-hidden="true" className="mt-1.5 size-1.5 shrink-0 rounded-full bg-warning" />
            5초 안에 끝나지 않아서 실행을 멈췄어요. 화면은 그대로 쓸 수 있어요.
          </p>
        </>
      }
      footer={
        <>
          <span className="text-warning">시간 초과 · 5.0초</span>
          <span>실행 #2</span>
        </>
      }
    >
      {LINES.map((text, index) => (
        <CodeLine key={index} number={index + 1} text={text} tone={index === 3 ? "error" : "normal"} />
      ))}
    </PreviewFrame>
  );
}
