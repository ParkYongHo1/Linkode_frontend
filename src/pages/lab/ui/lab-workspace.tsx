import { notFound } from "next/navigation";

import { getProblem } from "@/entities/problem";
import { getMyCode } from "@/entities/user-code";
import { getCurrentUser } from "@/entities/session";
import { getMyHints } from "@/features/request-hint/server";

import { HintPanelDemo } from "./hint-panel-demo";
import { LabEditorSection } from "./lab-editor-section";
import { LabTabs } from "./lab-tabs";
import { ProblemPanel } from "./problem-panel";

type LabWorkspaceProps = Pick<PageProps<"/problems/[id]">, "params">;

export async function LabWorkspace({ params }: LabWorkspaceProps) {
  const { id } = await params;
  const problem = await getProblem(id);

  if (!problem) {
    notFound();
  }
  const [savedCode, user, hints] = await Promise.all([
    getMyCode(problem.id),
    getCurrentUser(),
    getMyHints(problem.id),
  ]);

  const initialCode = savedCode?.code ?? problem.starterCode;
  const initialVersion = savedCode?.version ?? 0;

  return (
    <LabTabs
      problem={<ProblemPanel problem={problem} />}
      editor={
        <LabEditorSection
          problemId={problem.id}
          initialCode={initialCode}
          initialVersion={initialVersion}
          canSave={!!user}
          testCases={problem.testCases}
        />
      }
      hint={
        <HintPanelDemo
          problemId={problem.id}
          isLoggedIn={!!user}
          initialHints={hints}
        />
      }
    />
  );
}
