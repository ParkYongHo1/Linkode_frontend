"use client";

import { useState } from "react";
import { Play } from "lucide-react";

import { SaveStatusText, useAutoSave } from "@/features/save-code";

import { Button } from "@/shared/ui/button";
import { CodeEditor } from "@/widgets/code-editor";

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

  const { status, version } = useAutoSave({
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
          <Button type="button" disabled className="gap-2">
            <Play aria-hidden="true" className="size-3.5 fill-current" />
            실행
          </Button>
        </div>
      </div>

      <div className="min-h-0 flex-1">
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
        <p className="px-5 py-3 text-[13px] text-muted-foreground md:px-6">
          실행하면 결과가 여기에 표시돼요.
        </p>
      </section>
    </main>
  );
}
