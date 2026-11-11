import { Suspense } from "react";

import { COURSE_TITLE } from "../config/course";

import { ProblemSummarySection } from "./problem-summary-section";
import { ProblemTableSection } from "./problem-table-section";

export function ProblemListPage({ searchParams }: PageProps<"/problems">) {
  return (
    <main className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col px-12 pt-12 pb-20">
      <h1 className="text-[28px] leading-[38px] font-bold tracking-[-0.5px]">
        {COURSE_TITLE}
      </h1>

      <Suspense fallback={<p className="mt-1.5 h-[22.5px]" aria-hidden="true" />}>
        <ProblemSummarySection />
      </Suspense>

      <Suspense fallback={null}>
        <ProblemTableSection searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
