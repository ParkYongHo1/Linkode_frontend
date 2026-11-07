import type { ReactNode } from "react";

type PreviewFrameProps = {
  meta: string;
  side: ReactNode;
  footer: ReactNode;
  children: ReactNode;
};

export function PreviewFrame({ meta, side, footer, children }: PreviewFrameProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <div className="flex h-11 items-center justify-between border-b border-border px-4 text-[13px]">
        <span className="font-semibold">3-2. 미로의 최단 경로</span>
        <span className="text-muted-foreground">{meta}</span>
      </div>
      <div className="flex h-[260px]">
        <div aria-hidden="true" className="min-w-0 flex-1 overflow-hidden py-3.5 font-mono text-xs leading-5">
          {children}
        </div>
        <div className="flex w-[38%] flex-col gap-2.5 border-l border-border p-4">{side}</div>
      </div>
      <div className="flex h-8 items-center gap-4 border-t border-border px-4 text-xs text-muted-foreground">
        {footer}
      </div>
    </div>
  );
}
