import { getProblems } from "@/entities/problem";
import { getMyProgress } from "@/entities/progress";
import { formatMonthDay } from "@/shared/lib/format-date";
import { ContinueLab } from "@/widgets/continue-lab";

export async function ProblemSummarySection() {
  const [problems, progressList] = await Promise.all([
    getProblems(),
    getMyProgress(),
  ]);

  const passedCount = progressList.filter(
    (process) => process.status === "passed",
  ).length;

  const latest = progressList
    .filter((process) => process.status === "in_progress")
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0];

  const latestProblem = latest
    ? problems.find((problem) => problem.id === latest.problemId)
    : undefined;

  const summaryText =
    progressList.length > 0
      ? `시작한 ${progressList.length}문제 중 ${passedCount}문제를 통과했어요`
      : null;
  return (
    <>
      {summaryText && (
        <p className="mt-1.5 text-[15px] text-muted-foreground">
          {summaryText}
        </p>
      )}

      {latest && latestProblem && (
        <ContinueLab
          problemId={latestProblem.id}
          title={`${latestProblem.number}. ${latestProblem.title}`}
          summary={`${formatMonthDay(latest.updatedAt)}에 마지막으로 풀었어요.`}
        />
      )}
    </>
  );
}
