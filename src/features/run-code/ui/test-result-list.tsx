import { cn } from "@/shared/lib/utils";

import type { RunResult, TestResult, TestStatus } from "../model/types";
import { RunStatusMessage } from "./run-status-message";

type TestResultListProps = {
  tests: TestResult[];
  result: RunResult;
};

const STATUS_LABEL: Record<TestStatus, string> = {
  passed: "통과",
  failed: "실패",
  error: "에러",
};

const STATUS_CLASS: Record<TestStatus, string> = {
  passed: "text-success",
  failed: "text-destructive",
  error: "text-destructive",
};

function formatMs(ms: number) {
  return `${ms.toFixed(1)}ms`;
}

export function TestResultList({ tests, result }: TestResultListProps) {
  return (
    <div className="flex flex-col font-sans text-[13px] leading-[20px]">
      {result.status === "idle" && (
        <p className="text-muted-foreground">
          실행하면 테스트 결과가 여기에 표시돼요.
        </p>
      )}

      {tests.length > 0 && (
        <ol className="flex flex-col">
          {tests.map((test) => (
            <li
              key={test.index}
              className="flex flex-col gap-1.5 border-b border-border py-2.5 first:pt-0 last:border-b-0"
            >
              <div className="flex items-center gap-3 text-sm">
                <span className="text-foreground">테스트 {test.index + 1}</span>
                <span className={cn("font-medium", STATUS_CLASS[test.status])}>
                  {STATUS_LABEL[test.status]}
                </span>
                <span className="ml-auto text-muted-foreground tabular-nums">
                  {formatMs(test.durationMs)}
                </span>
              </div>
              {test.status !== "passed" && (
                <dl className="grid grid-cols-[48px_minmax(0,1fr)] gap-x-3 gap-y-0.5">
                  <dt className="text-muted-foreground">입력</dt>
                  <dd className="font-mono break-all text-body">
                    {test.inputText}
                  </dd>
                  <dt className="text-muted-foreground">기대값</dt>
                  <dd className="font-mono break-all text-body">
                    {test.expectedText}
                  </dd>
                  {test.status === "failed" && (
                    <>
                      <dt className="text-muted-foreground">실제값</dt>
                      <dd className="font-mono break-all text-destructive">
                        {test.actualText}
                      </dd>
                    </>
                  )}
                  {test.status === "error" && (
                    <>
                      <dt className="text-muted-foreground">에러</dt>
                      <dd className="font-mono break-all text-destructive">
                        {test.message}
                      </dd>
                    </>
                  )}
                </dl>
              )}
            </li>
          ))}
        </ol>
      )}

      <RunStatusMessage result={result} />
    </div>
  );
}
