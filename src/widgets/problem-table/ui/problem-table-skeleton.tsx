import { Skeleton } from "@/shared/ui/skeleton";

const ROWS = [0, 1, 2, 3, 4, 5];

export function ProblemTableSkeleton() {
  return (
    <div role="status" aria-label="문제 목록을 불러오고 있어요">
      <div className="-mx-5 mt-8 flex h-12 items-center gap-6 border-b border-border px-5 md:mx-0 md:mt-10 md:px-3.5">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-16" />
      </div>

      <ul className="md:hidden">
        {ROWS.map((row) => (
          <li
            key={row}
            className="flex flex-col gap-2 border-b border-border py-4"
          >
            <Skeleton className="h-3.5 w-32" />
            <Skeleton className="h-5 w-48" />
          </li>
        ))}
      </ul>

      <div className="hidden md:block">
        <div className="flex h-[47px] items-center border-b border-border" />
        {ROWS.map((row) => (
          <div
            key={row}
            className="flex h-[83px] items-center gap-4 border-b border-border"
          >
            <Skeleton className="h-4 w-8" />
            <div className="flex flex-1 flex-col gap-2 pl-8">
              <Skeleton className="h-4 w-44" />
              <Skeleton className="h-3.5 w-24" />
            </div>
            <Skeleton className="h-4 w-12" />
            <Skeleton className="ml-12 h-4 w-10" />
            <Skeleton className="ml-12 h-4 w-28" />
            <Skeleton className="ml-20 h-10 w-24" />
          </div>
        ))}
      </div>
    </div>
  );
}
