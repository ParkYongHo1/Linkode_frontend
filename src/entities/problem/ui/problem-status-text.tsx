import { cn } from "@/shared/lib/utils";

import type { ProblemStatus } from "../model/problem-status";

const DOT_COLOR: Record<ProblemStatus, string> = {
  passed: "bg-success",
  in_progress: "bg-primary",
  todo: "bg-input",
};

type ProblemStatusTextProps = {
  status: ProblemStatus;
  text: string;
};

export function ProblemStatusText({ status, text }: ProblemStatusTextProps) {
  return (
    <span className="flex items-center gap-2 text-sm text-body">
      <span aria-hidden="true" className={cn("size-[7px] shrink-0 rounded-full", DOT_COLOR[status])} />
      {text}
    </span>
  );
}
