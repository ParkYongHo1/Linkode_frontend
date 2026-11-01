import Link from "next/link";

import { Button } from "@/shared/ui/button";

type ContinueLabProps = {
  problemId: string;
  title: string;
  summary: string;
};

export function ContinueLab({ problemId, title, summary }: ContinueLabProps) {
  return (
    <section
      aria-labelledby="continue-lab-title"
      className="mt-9 flex flex-wrap items-center justify-between gap-5 border-y border-border py-6"
    >
      <div className="flex min-w-0 flex-col gap-1.5">
        <span className="text-[13px] font-semibold text-primary-strong">이어서 하던 실습</span>
        <h2 id="continue-lab-title" className="text-xl leading-[30px] font-bold">
          {title}
        </h2>
        <p className="text-sm leading-[22px] text-muted-foreground">{summary}</p>
      </div>
      <Button asChild size="lg">
        <Link href={`/problems/${problemId}`}>이어서 하기</Link>
      </Button>
    </section>
  );
}
