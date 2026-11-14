import { Suspense } from "react";

import { COURSE_TITLE } from "../config/course";

import { ProblemSummarySection } from "./problem-summary-section";
import { ProblemTableSection } from "./problem-table-section";

export function ProblemListPage({ searchParams }: PageProps<"/problems">) {
  return (
    <main className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col px-5 pt-8 pb-14 md:px-12 md:pt-12 md:pb-20">
      <h1 className="text-2xl leading-[34px] font-bold tracking-[-0.4px] md:text-[28px] md:leading-[38px] md:tracking-[-0.5px]">
        {COURSE_TITLE}
      </h1>

      <Suspense
        fallback={<p className="mt-1.5 h-[22.5px]" aria-hidden="true" />}
      >
        <ProblemSummarySection />
      </Suspense>

      <Suspense fallback={null}>
        <ProblemTableSection searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
