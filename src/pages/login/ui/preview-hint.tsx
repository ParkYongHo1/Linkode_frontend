import { cn } from "@/shared/lib/utils";

import { CodeLine } from "./code-line";
import { PreviewFrame } from "./preview-frame";

const LINES = [
  "function shortestPath(maze) {",
  "  const rows = maze.length;",
  "  const cols = maze[0].length;",
  "  const dist = Array.from({ length: rows },",
  "    () => Array(cols).fill(-1));",
  "  const queue = [[0, 0]];",
  "  dist[0][0] = 1;",
  "  while (queue.length > 0) {",
  "    const [r, c] = queue.shift();",
  "    for (const [dr, dc] of DIRS) {",
  "      if (maze[r + dr][c + dc] === 1 &&",
  "          dist[r + dr][c + dc] === -1) {",
];

const ERROR_LINE_INDEX = 10;
const OPENED_STEPS = [true, false, false];

export function PreviewHint() {
  return (
    <PreviewFrame
      meta="저장됨 · 버전 12"
      side={
        <>
          <div aria-hidden="true" className="flex gap-1">
            {OPENED_STEPS.map((opened, index) => (
              <span key={index} className={cn("h-[3px] flex-1 rounded-full", opened ? "bg-primary" : "bg-border")} />
            ))}
          </div>
          <span className="text-xs font-semibold text-primary-strong">힌트 1단계 · 방향</span>
          <p className="text-xs leading-[19px] text-body">
            BFS로 접근한 방향은 맞아요. 이웃 칸으로 가기 전에, 그 칸이 미로 안에 있는지 먼저 확인하고 있나요?
          </p>
        </>
      }
      footer={
        <>
          <span className="text-destructive">TypeError · 13번째 줄</span>
          <span>실행 #4 · 0.8초</span>
        </>
      }
    >
      {LINES.map((text, index) => (
        <CodeLine key={index} number={index + 3} text={text} tone={index === ERROR_LINE_INDEX ? "error" : "normal"} />
      ))}
    </PreviewFrame>
  );
}
