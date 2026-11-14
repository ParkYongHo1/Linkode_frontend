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
      <div className="flex h-14 shrink-0 items-stretch justify-between border-b border-border pr-4">
        <span className="flex items-center px-5 font-mono text-[13px] text-foreground shadow-[inset_0_-2px_0_var(--foreground)]">
          solution.js
        </span>
        <div className="flex items-center gap-4">
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
        className="flex h-[216px] shrink-0 flex-col border-t border-border"
      >
        <div className="flex h-11 shrink-0 items-center border-b border-border px-6">
          <h2 className="text-sm font-semibold">콘솔</h2>
        </div>
        <p className="px-6 py-3 text-[13px] text-muted-foreground">
          실행하면 결과가 여기에 표시돼요.
        </p>
      </section>
    </main>
  );
}
