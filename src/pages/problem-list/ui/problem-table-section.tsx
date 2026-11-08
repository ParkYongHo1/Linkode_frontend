import {
  getProblems,
  PROBLEM_STATUS_LABEL,
  type ProblemListItem,
} from "@/entities/problem";
import { ProblemTable } from "@/widgets/problem-table";

import { parseStatusFilter } from "../model/parse-status-filter";

type ProblemTableSectionProps = Pick<PageProps<"/problems">, "searchParams">;

export async function ProblemTableSection({
  searchParams,
}: ProblemTableSectionProps) {
  const { status } = await searchParams;
  const activeStatus = parseStatusFilter(status);

  const problems = await getProblems();

  const items: ProblemListItem[] = problems.map((problem) => ({
    ...problem,
    status: "todo",
    statusText: PROBLEM_STATUS_LABEL.todo,
  }));
  return <ProblemTable problems={items} activeStatus={activeStatus} />;
}
