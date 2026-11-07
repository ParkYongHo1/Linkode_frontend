import { CodeLine } from "./code-line";
import { PreviewFrame } from "./preview-frame";

const LINES = [
  { number: 10, text: "  while (queue.length > 0) {", tone: "normal" },
  { number: 11, text: "    const [r, c] = queue.shift();", tone: "normal" },
  { number: 12, text: "    for (const [dr, dc] of DIRS) {", tone: "normal" },
  { number: 13, text: "      const nr = r + dr, nc = c + dc;", tone: "added" },
  { number: 14, text: "      if (nr < 0 || nr >= rows ||", tone: "added" },
  { number: 15, text: "          nc < 0 || nc >= cols) continue;", tone: "added" },
  { text: "      if (maze[r + dr][c + dc] === 1 &&", tone: "removed" },
  { text: "          dist[r + dr][c + dc] === -1) {", tone: "removed" },
  { number: 16, text: "      if (maze[nr][nc] === 1 &&", tone: "added" },
  { number: 17, text: "          dist[nr][nc] === -1) {", tone: "added" },
  { number: 18, text: "        dist[nr][nc] = dist[r][c] + 1;", tone: "normal" },
  { number: 19, text: "        queue.push([nr, nc]);", tone: "normal" },
] as const;

const SUGGESTIONS = [
  { title: "미로 밖 칸은 건너뛰기", status: "수락함", accepted: true },
  { title: "nr, nc로 정리하기", status: "검토 전", accepted: false },
];

export function PreviewDiff() {
  return (
    <PreviewFrame
      meta="AI 제안 1곳 검토 중"
      side={
        <>
          <span className="text-xs font-semibold text-primary-strong">힌트 3단계 · 거의 정답</span>
          <ul className="border-t border-border">
            {SUGGESTIONS.map((suggestion) => (
              <li
                key={suggestion.title}
                className="flex items-center justify-between gap-2 border-b border-border py-2.5 text-xs"
              >
                <span className="font-semibold">{suggestion.title}</span>
                <span className={suggestion.accepted ? "font-semibold text-success" : "text-muted-foreground"}>
                  {suggestion.status}
                </span>
              </li>
            ))}
          </ul>
          <div aria-hidden="true" className="mt-auto flex gap-1.5">
            <span className="flex h-7 flex-1 items-center justify-center rounded-md bg-primary text-xs font-semibold text-primary-foreground">
              수락
            </span>
            <span className="flex h-7 flex-1 items-center justify-center rounded-md border border-input text-xs">
              거절
            </span>
          </div>
        </>
      }
      footer={
        <>
          <span>제안마다 따로 수락하거나 거절해요</span>
        </>
      }
    >
      {LINES.map((line, index) => (
        <CodeLine key={index} number={"number" in line ? line.number : undefined} text={line.text} tone={line.tone} />
      ))}
    </PreviewFrame>
  );
}
