"use client";

import { useState } from "react";
import { Play, Square } from "lucide-react";

import { markPassed } from "@/features/record-pass";

import type { ProblemTestCase } from "@/entities/problem";
import {
  ConsolePanel,
  useCodeRunner,
  type TestResult,
  type ConsoleTab,
} from "@/features/run-code";

import {
  ConflictBanner,
  SaveStatusText,
  useAutoSave,
} from "@/features/save-code";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { CodeDiffViewer, CodeEditor } from "@/widgets/code-editor";

type LabEditorSectionProps = {
  problemId: string;
  initialCode: string;
  initialVersion: number;
  canSave: boolean;
  testCases: ProblemTestCase[];
};

export function LabEditorSection({
  problemId,
  initialCode,
  initialVersion,
  canSave,
  testCases,
}: LabEditorSectionProps) {
  const [code, setCode] = useState(initialCode);
  const [isDiffOpen, setIsDiffOpen] = useState(false);
  const [consoleTab, setConsoleTab] = useState<ConsoleTab>("tests");

  function handleDone(results: TestResult[]) {
    if (!canSave) return;
    if (results.length !== testCases.length) return;
    if (!results.every((test) => test.status === "passed")) return;

    markPassed(problemId).catch((error) => console.error(error));
  }
  const { lines, tests, result, run, cancel } = useCodeRunner({
    onDone: handleDone,
  });

  const { status, version, overwrite, conflictCode } = useAutoSave({
    problemId,
    code,
    initialCode,
    initialVersion,
    enabled: canSave,
  });

  function handleRun() {
    setConsoleTab("tests");
    run(code, testCases);
  }

  return (
    <main className="flex min-w-0 flex-1 flex-col">
      <div className="flex h-12 shrink-0 items-stretch justify-between gap-3 border-b border-border pr-3 md:h-14 md:pr-4">
        <span className="hidden items-center px-5 font-mono text-[13px] text-foreground shadow-[inset_0_-2px_0_var(--foreground)] md:flex">
          solution.js
        </span>
        <div className="flex min-w-0 flex-1 items-center justify-between gap-3 pl-5 md:flex-none md:justify-end md:gap-4 md:pl-0">
          <SaveStatusText status={status} version={version} />
          {result.status === "running" ? (
            <Button
              type="button"
              variant="outline"
              className="gap-2"
              onClick={cancel}
            >
              <Square aria-hidden="true" className="size-3 fill-current" />
              중단
            </Button>
          ) : (
            <Button type="button" className="gap-2" onClick={handleRun}>
              <Play aria-hidden="true" className="size-3.5 fill-current" />
              실행
            </Button>
          )}
        </div>
      </div>

      {status === "conflict" && (
        <ConflictBanner
          isDiffOpen={isDiffOpen}
          onToggleDiff={() => setIsDiffOpen((prev) => !prev)}
          onOverwrite={overwrite}
        />
      )}

      {status === "conflict" && isDiffOpen && (
        <div className="min-h-0 flex-1">
          <CodeDiffViewer
            original={conflictCode}
            modified={code}
            originalLabel="다른 탭 저장본"
            modifiedLabel="이 탭 (저장 안 됨)"
          />
        </div>
      )}

      <div
        className={cn(
          "min-h-0 flex-1",
          status === "conflict" && isDiffOpen && "hidden",
        )}
      >
        <CodeEditor
          defaultValue={initialCode}
          onChange={(value) => setCode(value ?? "")}
        />
      </div>

      <ConsolePanel
        activeTab={consoleTab}
        onTabChange={setConsoleTab}
        lines={lines}
        tests={tests}
        totalTests={testCases.length}
        result={result}
      />
    </main>
  );
}
