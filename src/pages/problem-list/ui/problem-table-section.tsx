import { getProblems } from "@/entities/problem";
import { getMyProgress } from "@/entities/progress";
import { ProblemTable } from "@/widgets/problem-table";

import { parseStatusFilter } from "../model/parse-status-filter";
import { toProblemListItem } from "../model/to-problem-list-item";

type ProblemTableSectionProps = Pick<PageProps<"/problems">, "searchParams">;

export async function ProblemTableSection({
  searchParams,
}: ProblemTableSectionProps) {
  const { status } = await searchParams;
  const activeStatus = parseStatusFilter(status);

  const [problems, progressList] = await Promise.all([
    getProblems(),
    getMyProgress(),
  ]);

  const progressByProblemId = new Map(
    progressList.map((progress) => [progress.problemId, progress]),
  );

  const items = problems.map((problem) =>
    toProblemListItem(problem, progressByProblemId.get(problem.id)),
  );

  return <ProblemTable problems={items} activeStatus={activeStatus} />;
}
