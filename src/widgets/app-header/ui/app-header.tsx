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
        "flex h-14 shrink-0 items-center justify-between gap-3 border-b border-border px-5 md:h-16 md:gap-4 md:px-12",
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-5 md:gap-10">
        <Link href="/" className="flex items-center gap-2 text-foreground">
          <span className="text-[17px] font-bold tracking-[-0.3px] md:text-lg">Linkode</span>
        </Link>
        {nav}
      </div>
      <div className="flex shrink-0 items-center gap-1 md:gap-2">{actions}</div>
    </header>
  );
}
