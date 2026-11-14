"use client";

import { Button } from "@/shared/ui/button";

type ConflictBannerProps = {
  isDiffOpen: boolean;
  onToggleDiff: () => void;
  onOverwrite: () => void;
};

export function ConflictBanner({
  isDiffOpen,
  onToggleDiff,
  onOverwrite,
}: ConflictBannerProps) {
  return (
    <div
      role="alert"
      className="flex shrink-0 flex-col gap-3 border-b border-border bg-destructive-weak px-5 py-3 md:flex-row md:items-center md:justify-between md:px-6"
    >
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-semibold text-foreground">
          다른 탭에서 먼저 저장했어요
        </span>
        <span className="text-[13px] leading-5 text-body">
          이 탭에서 고친 내용은 아직 저장되지 않았어요. 차이를 보고 남길 쪽을
          골라주세요.
        </span>
      </div>
      <div className="flex shrink-0 flex-wrap gap-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          aria-pressed={isDiffOpen}
          onClick={onToggleDiff}
        >
          {isDiffOpen ? "차이 닫기" : "차이 보기"}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="bg-background"
          onClick={() => window.location.reload()}
        >
          최신 코드 불러오기
        </Button>
        <Button type="button" size="sm" onClick={onOverwrite}>
          이 탭 내용으로 덮어쓰기
        </Button>
      </div>
    </div>
  );
}
