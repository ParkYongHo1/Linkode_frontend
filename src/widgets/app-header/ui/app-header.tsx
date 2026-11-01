import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/shared/lib/utils";

type AppHeaderProps = {
  nav?: ReactNode;
  actions?: ReactNode;
  className?: string;
};

export function AppHeader({ nav, actions, className }: AppHeaderProps) {
  return (
    <header
      className={cn(
        "flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border px-12",
        className,
      )}
    >
      <div className="flex items-center gap-10">
        <Link href="/" className="flex items-center gap-2 text-foreground">
          <span className="text-lg font-bold tracking-[-0.3px]">Linkode</span>
        </Link>
        {nav}
      </div>
      <div className="flex items-center gap-2">{actions}</div>
    </header>
  );
}
