import Link from "next/link";
import { CircleCheck } from "lucide-react";

import { Button } from "@/shared/ui/button";

type PassBannerProps = {
  isLoggedIn: boolean;
  nextProblem: { id: string; title: string } | null;
};

export function PassBanner({ isLoggedIn, nextProblem }: PassBannerProps) {
  return (
    <div
      role="status"
      className="flex shrink-0 flex-col gap-3 border-t border-border px-5 py-3.5 md:flex-row md:items-center md:justify-between md:px-6"
    >
      <div className="flex items-start gap-2.5">
        <CircleCheck
          aria-hidden="true"
          className="mt-0.5 size-5 shrink-0 text-success"
        />
        <div className="flex flex-col gap-0.5">
          <span className="text-[15px] font-semibold text-foreground">
            모든 테스트를 통과했어요
          </span>
          {isLoggedIn ? (
            <span className="text-[13px] text-muted-foreground">
              통과 기록을 남겼어요
            </span>
          ) : (
            <span className="text-[13px] text-muted-foreground">
              <Link
                href="/login"
                className="font-medium text-primary-strong underline-offset-4 hover:underline"
              >
                로그인
              </Link>
              하면 통과 기록이 남아요
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <Button asChild variant="outline" className="flex-1 md:flex-none">
          <Link href="/problems">문제 목록으로</Link>
        </Button>
        {nextProblem && (
          <Button asChild className="flex-1 md:flex-none">
            <Link href={`/problems/${nextProblem.id}`}>
              다음 문제 · {nextProblem.title}
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
