import { ContinueLab } from "@/widgets/continue-lab";
import { ProblemTable } from "@/widgets/problem-table";

import { MOCK_CONTINUE_LAB, MOCK_COURSE_TITLE, MOCK_PROBLEMS } from "../model/mock";

export function ProblemListPage() {
  const passedCount = MOCK_PROBLEMS.filter((problem) => problem.status === "passed").length;

  return (
    <main className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col px-12 pt-12 pb-20">
      <h1 className="text-[28px] leading-[38px] font-bold tracking-[-0.5px]">{MOCK_COURSE_TITLE}</h1>
      <p className="mt-1.5 text-[15px] text-muted-foreground">
        {MOCK_PROBLEMS.length}문제 중 {passedCount}문제를 통과했어요
      </p>

      <ContinueLab {...MOCK_CONTINUE_LAB} />

      <ProblemTable problems={MOCK_PROBLEMS} />
    </main>
  );
}
