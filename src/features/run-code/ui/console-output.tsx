import { cn } from "@/shared/lib/utils";

import type { ConsoleLine, RunResult } from "../model/types";
import { RunStatusMessage } from "./run-status-message";

type ConsoleOutputProps = {
  lines: ConsoleLine[];
  result: RunResult;
};

const LINE_CLASS: Record<ConsoleLine["level"], string> = {
  log: "text-body",
  warn: "text-warning",
  error: "text-destructive",
};

export function ConsoleOutput({ lines, result }: ConsoleOutputProps) {
  return (
    <div className="flex flex-col gap-0.5 font-mono text-[13px] leading-[22px]">
      {result.status === "idle" && lines.length === 0 && (
        <p className="font-sans text-muted-foreground">
          console.log로 출력한 내용이 여기에 표시돼요.
        </p>
      )}

      {result.status !== "idle" &&
        result.status !== "running" &&
        lines.length === 0 && (
          <p className="font-sans text-muted-foreground">출력이 없어요.</p>
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

      <RunStatusMessage result={result} />
    </div>
  );
}
