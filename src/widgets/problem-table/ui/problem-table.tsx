import Link from "next/link";
import { ChevronRight } from "lucide-react";

import {
  PROBLEM_LEVEL_LABEL,
  PROBLEM_STATUS_LABEL,
  ProblemStatusText,
  type ProblemListItem,
  type ProblemStatus,
} from "@/entities/problem";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { type ProblemStatusFilter } from "../model/status-filter";

const TABS: { value: ProblemStatusFilter; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "in_progress", label: PROBLEM_STATUS_LABEL.in_progress },
  { value: "passed", label: PROBLEM_STATUS_LABEL.passed },
  { value: "todo", label: PROBLEM_STATUS_LABEL.todo },
];

const ACTION: Record<
  ProblemStatus,
  { label: string; variant: "default" | "outline" | "ghost" }
> = {
  in_progress: { label: "이어서 하기", variant: "default" },
  todo: { label: "시작하기", variant: "outline" },
  passed: { label: "다시 풀기", variant: "ghost" },
};

type ProblemTableProps = {
  problems: ProblemListItem[];
  activeStatus: ProblemStatusFilter;
  showProgress: boolean;
};

export function ProblemTable({
  problems,
  activeStatus,
  showProgress,
}: ProblemTableProps) {
  const visibleProblems =
    !showProgress || activeStatus === "all"
      ? problems
      : problems.filter((problem) => problem.status === activeStatus);

  return (
    <>
      {showProgress && (
        <nav
          aria-label="문제 상태 필터"
          className="-mx-5 mt-8 flex gap-1 overflow-x-auto border-b border-border px-2 md:mx-0 md:mt-10 md:px-0"
        >
          {TABS.map((tab) => {
            const isActive = tab.value === activeStatus;
            const count =
              tab.value === "all"
                ? problems.length
                : problems.filter((p) => p.status === tab.value).length;

            return (
              <Link
                href={
                  tab.value === "all"
                    ? "/problems"
                    : `/problems?status=${tab.value}`
                }
                key={tab.value}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex h-12 shrink-0 items-center px-3 text-[15px] whitespace-nowrap md:px-3.5",
                  isActive
                    ? "font-semibold text-foreground shadow-[inset_0_-2px_0_var(--foreground)]"
                    : "font-medium text-muted-foreground",
                )}
              >
                {tab.label}
                <span
                  className={cn(
                    "ml-0.5",
                    isActive ? "text-primary-strong" : "text-muted-foreground",
                  )}
                >
                  {count}
                </span>
              </Link>
            );
          })}
        </nav>
      )}

      <ul
        aria-label="문제 목록"
        className={cn(
          "md:hidden",
          !showProgress && "mt-6 border-t border-border",
        )}
      >
        {visibleProblems.map((problem) => (
          <li key={problem.id} className="border-b border-border">
            <Link
              href={`/problems/${problem.id}`}
              className="flex items-center gap-3 py-4 text-foreground"
            >
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="text-[13px] text-muted-foreground">
                  {problem.number} · {problem.topic} ·{" "}
                  {PROBLEM_LEVEL_LABEL[problem.level]}
                </span>
                <span className="text-base leading-6 font-semibold">
                  {problem.title}
                </span>
                {showProgress && (
                  <ProblemStatusText
                    status={problem.status}
                    text={problem.statusText}
                  />
                )}
              </div>
              <ChevronRight
                aria-hidden="true"
                className="size-5 shrink-0 text-subtle"
              />
            </Link>
          </li>
        ))}
      </ul>

      <div
        className={cn(
          "hidden overflow-x-auto md:block",
          !showProgress && "mt-10",
        )}
      >
        <table className="w-full min-w-[820px] border-collapse text-[15px]">
          <thead>
            <tr className="text-left text-[13px] text-muted-foreground">
              <th
                scope="col"
                className="w-16 border-b border-border py-3.5 font-medium"
              >
                번호
              </th>
              <th
                scope="col"
                className="border-b border-border py-3.5 font-medium"
              >
                문제
              </th>
              <th
                scope="col"
                className="w-24 border-b border-border py-3.5 font-medium"
              >
                난이도
              </th>
              <th
                scope="col"
                className="w-24 border-b border-border py-3.5 font-medium"
              >
                예상 시간
              </th>
              {showProgress && (
                <th
                  scope="col"
                  className="w-[220px] border-b border-border py-3.5 font-medium"
                >
                  진행 상태
                </th>
              )}
              <th scope="col" className="w-28 border-b border-border py-3.5">
                <span className="sr-only">이동</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {visibleProblems.map((problem) => {
              const action = ACTION[problem.status];

              return (
                <tr key={problem.id}>
                  <td className="border-b border-border py-[18px] text-muted-foreground tabular-nums">
                    {problem.number}
                  </td>
                  <td className="border-b border-border py-[18px] pr-4">
                    <div className="leading-[23px] font-semibold">
                      {problem.title}
                    </div>
                    <div className="mt-0.5 text-[13px] text-muted-foreground">
                      {problem.topic}
                    </div>
                  </td>
                  <td className="border-b border-border py-[18px] text-body">
                    {PROBLEM_LEVEL_LABEL[problem.level]}
                  </td>
                  <td className="border-b border-border py-[18px] text-body">
                    {problem.estimatedMinutes}분
                  </td>
                  {showProgress && (
                    <td className="border-b border-border py-[18px]">
                      <ProblemStatusText
                        status={problem.status}
                        text={problem.statusText}
                      />
                    </td>
                  )}
                  <td className="border-b border-border py-[18px] text-right">
                    <Button
                      asChild
                      variant={action.variant}
                      className={cn(action.variant === "ghost" && "px-1.5")}
                    >
                      <Link href={`/problems/${problem.id}`}>
                        {action.label}
                      </Link>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
