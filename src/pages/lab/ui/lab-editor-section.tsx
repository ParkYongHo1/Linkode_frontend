"use client";

import { useState } from "react";
import { Play } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { CodeEditor } from "@/widgets/code-editor";

type LabEditorSectionProps = {
  starterCode: string;
};

export function LabEditorSection({ starterCode }: LabEditorSectionProps) {
  const [code, setCode] = useState(starterCode);

  return (
    <main className="flex min-w-0 flex-1 flex-col">
      <div className="flex h-14 shrink-0 items-stretch justify-between border-b border-border pr-4">
        <span className="flex items-center px-5 font-mono text-[13px] text-foreground shadow-[inset_0_-2px_0_var(--foreground)]">
          solution.js
        </span>
        <div className="flex items-center gap-4">
          <Button type="button" disabled className="gap-2">
            <Play aria-hidden="true" className="size-3.5 fill-current" />
            실행
          </Button>
        </div>
      </div>

      <div className="min-h-0 flex-1">
        <CodeEditor
          defaultValue={starterCode}
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
