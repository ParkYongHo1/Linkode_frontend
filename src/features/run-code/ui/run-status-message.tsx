import type { RunResult } from "../model/types";

type RunStatusMessageProps = {
  result: RunResult;
};

function formatSeconds(ms: number) {
  return `${(ms / 1000).toFixed(1)}초`;
}

export function RunStatusMessage({ result }: RunStatusMessageProps) {
  if (result.status === "running") {
    return (
      <p className="mt-1 flex items-center gap-2 font-sans text-muted-foreground">
        <span
          aria-hidden="true"
          className="size-3 animate-spin rounded-full border-2 border-border border-t-primary"
        />
        실행하고 있어요
      </p>
    );
  }

  if (result.status === "done") {
    return (
      <p className="mt-1 font-sans text-muted-foreground">
        실행이 끝났어요
        {result.durationMs !== null && ` · ${formatSeconds(result.durationMs)}`}
      </p>
    );
  }

  if (result.status === "timeout") {
    return (
      <div className="mt-2 flex flex-col gap-1 font-sans">
        <p className="flex items-center gap-2 font-semibold text-foreground">
          <span aria-hidden="true" className="size-2 rounded-full bg-warning" />
          5초 안에 끝나지 않아서 실행을 멈췄어요
        </p>
        <p className="text-muted-foreground">
          반복문이 끝나는 조건을 확인해 보세요. 멈추기 전까지의 결과는 위에
          남겨뒀어요.
        </p>
      </div>
    );
  }

  if (result.status === "cancelled") {
    return (
      <p className="mt-1 font-sans text-muted-foreground">실행을 중단했어요</p>
    );
  }

  if (result.status === "error") {
    return (
      <p className="mt-2 rounded-md bg-destructive-weak px-3 py-2 break-all text-destructive">
        {result.errorMessage}
      </p>
    );
  }

  return null;
}
