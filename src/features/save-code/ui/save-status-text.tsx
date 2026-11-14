import { cn } from "@/shared/lib/utils";

import type { SaveStatus } from "../model/save-status";

type SaveStatusTextProps = {
  status: SaveStatus;
  version: number;
};

const DOT_CLASS: Partial<Record<SaveStatus, string>> = {
  error: "bg-warning",
  conflict: "bg-destructive",
};

function getText(status: SaveStatus, version: number) {
  switch (status) {
    case "guest":
      return "로그인하면 코드가 저장돼요";
    case "idle":
      return version > 0 ? `저장됨 · 버전 ${version}` : "아직 저장 전";
    case "saving":
      return "저장 중";
    case "saved":
      return `저장됨 · 버전 ${version}`;
    case "error":
      return "저장하지 못했어요 · 다시 시도할게요";
    case "conflict":
      return "다른 탭에서 먼저 저장했어요";
  }
}

export function SaveStatusText({ status, version }: SaveStatusTextProps) {
  const dotClass = DOT_CLASS[status];

  return (
    <span
      role="status"
      className="flex items-center gap-2 text-[13px] text-muted-foreground"
    >
      {status === "saving" && (
        <span
          aria-hidden="true"
          className="size-3 animate-spin rounded-full border-2 border-border border-t-primary"
        />
      )}
      {dotClass && (
        <span
          aria-hidden="true"
          className={cn("size-2 rounded-full", dotClass)}
        />
      )}
      {getText(status, version)}
    </span>
  );
}
