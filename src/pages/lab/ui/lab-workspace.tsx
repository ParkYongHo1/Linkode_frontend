import { notFound } from "next/navigation";

import { getProblem } from "@/entities/problem";

import { ProblemPanel } from "./problem-panel";

type LabWorkspaceProps = Pick<PageProps<"/problems/[id]">, "params">;

export async function LabWorkspace({ params }: LabWorkspaceProps) {
  const { id } = await params;
  const problem = await getProblem(id);

  if (!problem) {
    notFound();
  }

  return (
    <div className="flex min-h-0 flex-1">
      <ProblemPanel problem={problem} />

      <main className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-14 shrink-0 items-stretch justify-between border-b border-border pr-4">
          <span className="flex items-center px-5 font-mono text-[13px] text-foreground shadow-[inset_0_-2px_0_var(--foreground)]">
            solution.js
          </span>
        </div>

        <pre className="min-h-0 flex-1 overflow-auto px-6 py-4 font-mono text-sm leading-6 text-foreground">
          {problem.starterCode}
        </pre>

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
