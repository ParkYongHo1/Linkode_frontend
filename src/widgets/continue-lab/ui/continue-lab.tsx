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
      className="mt-6 flex flex-col gap-4 border-y border-border py-5 md:mt-9 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-5 md:py-6"
    >
      <div className="flex min-w-0 flex-col gap-1.5">
        <span className="text-[13px] font-semibold text-primary-strong">
          이어서 하던 실습
        </span>
        <h2
          id="continue-lab-title"
          className="text-lg leading-[27px] font-bold md:text-xl md:leading-[30px]"
        >
          {title}
        </h2>
        <p className="text-sm leading-[22px] text-muted-foreground">
          {summary}
        </p>
      </div>
      <Button asChild size="lg" className="w-full md:w-auto">
        <Link href={`/problems/${problemId}`}>이어서 하기</Link>
      </Button>
    </section>
  );
}
