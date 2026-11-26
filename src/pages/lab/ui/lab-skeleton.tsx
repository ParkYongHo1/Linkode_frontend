import { Skeleton } from "@/shared/ui/skeleton";

const PROBLEM_LINES = ["w-full", "w-11/12", "w-4/5", "w-full", "w-2/3"];
const CODE_LINES = ["w-56", "w-72", "w-64", "w-40", "w-80", "w-60", "w-24"];

export function LabSkeleton() {
  return (
    <div
      role="status"
      aria-label="실습 화면을 불러오고 있어요"
      className="flex min-h-0 flex-1 flex-col md:flex-row"
    >
      <div className="grid h-12 shrink-0 grid-cols-2 border-b border-border md:hidden" />

      <div className="hidden w-80 shrink-0 flex-col border-r border-border px-6 pt-7 md:flex">
        <Skeleton className="h-3.5 w-10" />
        <Skeleton className="mt-2.5 h-6 w-40" />
        <Skeleton className="mt-2.5 h-3.5 w-36" />
        <div className="mt-8 flex flex-col gap-3">
          {PROBLEM_LINES.map((width, index) => (
            <Skeleton key={index} className={`h-4 ${width}`} />
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-12 shrink-0 items-center justify-between border-b border-border px-5 md:h-14">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-20" />
        </div>
        <div className="flex flex-1 flex-col gap-3 px-6 py-5">
          {CODE_LINES.map((width, index) => (
            <Skeleton key={index} className={`h-4 ${width}`} />
          ))}
        </div>
        <div className="h-40 shrink-0 border-t border-border md:h-[216px]" />
      </div>

      <div className="hidden w-[400px] shrink-0 flex-col border-l border-border md:flex">
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-border px-6">
          <Skeleton className="h-4 w-14" />
          <Skeleton className="h-3.5 w-20" />
        </div>
        <div className="grid grid-cols-3 gap-1.5 px-6 pt-5">
          <Skeleton className="h-1" />
          <Skeleton className="h-1" />
          <Skeleton className="h-1" />
        </div>
        <div className="flex flex-col gap-2 px-6 pt-8">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
    </div>
  );
}
