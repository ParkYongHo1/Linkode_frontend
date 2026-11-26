import { notFound } from "next/navigation";

import { getProblem, getProblems } from "@/entities/problem";
import { getMyCode } from "@/entities/user-code";
import { getCurrentUser } from "@/entities/session";
import { getMyHintRemaining, getMyHints } from "@/features/request-hint/server";

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
  const [savedCode, user, hints, remaining, problems] = await Promise.all([
    getMyCode(problem.id),
    getCurrentUser(),
    getMyHints(problem.id),
    getMyHintRemaining(),
    getProblems(),
  ]);

  const currentIndex = problems.findIndex((item) => item.id === problem.id);
  const next = problems[currentIndex + 1];
  const nextProblem = next ? { id: next.id, title: next.title } : null;

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
          initialHints={hints}
          initialRemaining={remaining}
          nextProblem={nextProblem}
        />
      }
    />
  );
}
