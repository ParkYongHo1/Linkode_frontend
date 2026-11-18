import { cn } from "@/shared/lib/utils";

import type { ConsoleLine, RunResult } from "../model/types";

type ConsoleOutputProps = {
  lines: ConsoleLine[];
  result: RunResult;
};

const LINE_CLASS: Record<ConsoleLine["level"], string> = {
  log: "text-body",
  warn: "text-warning",
  error: "text-destructive",
};

function formatSeconds(ms: number) {
  return `${(ms / 1000).toFixed(1)}초`;
}

export function ConsoleOutput({ lines, result }: ConsoleOutputProps) {
  return (
    <div
      aria-live="polite"
      className="flex min-h-0 flex-1 flex-col gap-0.5 overflow-auto px-5 py-3 font-mono text-[13px] leading-[22px] md:px-6"
    >
      {result.status === "idle" && lines.length === 0 && (
        <p className="font-sans text-muted-foreground">
          실행하면 결과가 여기에 표시돼요.
        </p>
      )}

      {lines.map((line, index) => (
        <div
          key={index}
          className={cn(
            "break-all whitespace-pre-wrap",
            LINE_CLASS[line.level],
          )}
        >
          {line.text}
        </div>
      ))}

      {result.status === "running" && (
        <p className="mt-1 flex items-center gap-2 font-sans text-muted-foreground">
          <span
            aria-hidden="true"
            className="size-3 animate-spin rounded-full border-2 border-border border-t-primary"
          />
          실행하고 있어요
        </p>
      )}

      {result.status === "done" && (
        <p className="mt-1 font-sans text-muted-foreground">
          실행이 끝났어요
          {result.durationMs !== null &&
            ` · ${formatSeconds(result.durationMs)}`}
        </p>
      )}

      {result.status === "timeout" && (
        <div className="mt-2 flex flex-col gap-1 font-sans">
          <p className="flex items-center gap-2 font-semibold text-foreground">
            <span
              aria-hidden="true"
              className="size-2 rounded-full bg-warning"
            />
            5초 안에 끝나지 않아서 실행을 멈췄어요
          </p>
          <p className="text-muted-foreground">
            반복문이 끝나는 조건을 확인해 보세요. 멈추기 전까지의 출력은 위에
            남겨뒀어요.
          </p>
        </div>
      )}

      {result.status === "cancelled" && (
        <p className="mt-1 font-sans text-muted-foreground">
          실행을 중단했어요
        </p>
      )}

      {result.status === "error" && (
        <p className="mt-2 rounded-md bg-destructive-weak px-3 py-2 break-all text-destructive">
          {result.errorMessage}
        </p>
      )}
    </div>
  );
}
