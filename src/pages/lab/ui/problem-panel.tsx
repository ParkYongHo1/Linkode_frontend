import { PROBLEM_LEVEL_LABEL, type ProblemDetail } from "@/entities/problem";
import { Markdown } from "@/shared/ui/markdown";

type ProblemPanelProps = {
  problem: ProblemDetail;
};

export function ProblemPanel({ problem }: ProblemPanelProps) {
  return (
    <aside
      aria-label="문제 설명"
      className="w-80 shrink-0 overflow-y-auto border-r border-border px-6 pt-7 pb-10"
    >
      <p className="text-[13px] text-muted-foreground">{problem.number}</p>
      <h1 className="mt-1 text-xl leading-[30px] font-bold tracking-[-0.3px]">
        {problem.title}
      </h1>
      <p className="mt-1 text-[13px] text-muted-foreground">
        {problem.topic} · {PROBLEM_LEVEL_LABEL[problem.level]} · 예상{" "}
        {problem.estimatedMinutes}분
      </p>

      <Markdown className="mt-6">{problem.description}</Markdown>

      <h2 className="mt-7 text-[15px] font-semibold">제한 사항</h2>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-[23px] text-body">
        <li>
          함수 이름은{" "}
          <code className="rounded-sm bg-secondary px-1 py-0.5 font-mono text-[0.9em]">
            solution
          </code>
          으로 유지해주세요.
        </li>
        <li>실행은 5초가 지나면 자동으로 멈춰요.</li>
      </ul>
    </aside>
  );
}
