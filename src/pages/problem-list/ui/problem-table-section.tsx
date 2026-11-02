import { ProblemTable } from "@/widgets/problem-table";

import { MOCK_PROBLEMS } from "../model/mock";
import { parseStatusFilter } from "../model/parse-status-filter";

type ProblemTableSectionProps = Pick<PageProps<"/problems">, "searchParams">;

export async function ProblemTableSection({
  searchParams,
}: ProblemTableSectionProps) {
  const { status } = await searchParams;
  const activeStatus = parseStatusFilter(status);

  return <ProblemTable problems={MOCK_PROBLEMS} activeStatus={activeStatus} />;
}
