"use client";

import { useState } from "react";
import { Play } from "lucide-react";

import { ConsoleOutput, useCodeRunner } from "@/features/run-code";
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
};

export function LabEditorSection({
  problemId,
  initialCode,
  initialVersion,
  canSave,
}: LabEditorSectionProps) {
  const [code, setCode] = useState(initialCode);
  const [isDiffOpen, setIsDiffOpen] = useState(false);
  const { lines, result, run } = useCodeRunner();

  const { status, version, overwrite, conflictCode } = useAutoSave({
    problemId,
    code,
    initialCode,
    initialVersion,
    enabled: canSave,
  });

  return (
    <main className="flex min-w-0 flex-1 flex-col">
      <div className="flex h-12 shrink-0 items-stretch justify-between gap-3 border-b border-border pr-3 md:h-14 md:pr-4">
        <span className="hidden items-center px-5 font-mono text-[13px] text-foreground shadow-[inset_0_-2px_0_var(--foreground)] md:flex">
          solution.js
        </span>
        <div className="flex min-w-0 flex-1 items-center justify-between gap-3 pl-5 md:flex-none md:justify-end md:gap-4 md:pl-0">
          <SaveStatusText status={status} version={version} />
          <Button
            type="button"
            className="gap-2"
            disabled={result.status === "running"}
            onClick={() => run(code)}
          >
            <Play aria-hidden="true" className="size-3.5 fill-current" />
            실행
          </Button>
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

      <section
        aria-label="콘솔"
        className="flex h-40 shrink-0 flex-col border-t border-border md:h-[216px]"
      >
        <div className="flex h-11 shrink-0 items-center border-b border-border px-5 md:px-6">
          <h2 className="text-sm font-semibold">콘솔</h2>
        </div>
        <ConsoleOutput lines={lines} result={result} />
      </section>
    </main>
  );
}
