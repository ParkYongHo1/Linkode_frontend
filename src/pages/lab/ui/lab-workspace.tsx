import { notFound } from "next/navigation";

import { getProblem } from "@/entities/problem";
import { getMyCode } from "@/entities/user-code";
import { getCurrentUser } from "@/entities/session";

import { LabEditorSection } from "./lab-editor-section";
import { ProblemPanel } from "./problem-panel";

type LabWorkspaceProps = Pick<PageProps<"/problems/[id]">, "params">;

export async function LabWorkspace({ params }: LabWorkspaceProps) {
  const { id } = await params;
  const problem = await getProblem(id);

  if (!problem) {
    notFound();
  }
  const [savedCode, user] = await Promise.all([
    getMyCode(problem.id),
    getCurrentUser(),
  ]);

  const initialCode = savedCode?.code ?? problem.starterCode;
  const initialVersion = savedCode?.version ?? 0;

  return (
    <div className="flex min-h-0 flex-1">
      <ProblemPanel problem={problem} />

      <LabEditorSection
        problemId={problem.id}
        initialCode={initialCode}
        initialVersion={initialVersion}
        canSave={!!user}
      />

      <aside
        aria-label="AI 힌트"
        className="flex w-[400px] shrink-0 flex-col border-l border-border"
      >
        <div className="flex h-14 shrink-0 items-center border-b border-border px-6">
          <h2 className="text-[15px] font-semibold">AI 힌트</h2>
        </div>
        <div className="flex flex-col gap-2 px-6 pt-8">
          <span className="text-[17px] leading-[26px] font-bold">
            막혔다면 힌트를 열어보세요
          </span>
          <p className="text-sm leading-[22px] text-muted-foreground">
            정답을 바로 알려주지 않아요. 방향부터 하나씩 알려줘요.
          </p>
        </div>
      </aside>
    </div>
  );
}
