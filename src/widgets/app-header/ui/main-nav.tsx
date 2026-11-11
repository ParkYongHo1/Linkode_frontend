"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

import { cn } from "@/shared/lib/utils";

const NAV_ITEMS = [{ href: "/problems", label: "실습 문제" }];

function NavLinks({ pathname }: { pathname: string | null }) {
  return (
    <nav aria-label="주요 메뉴" className="flex gap-7 text-[15px]">
      {NAV_ITEMS.map((item) => {
        const isActive =
          pathname === item.href || pathname?.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              isActive
                ? "font-semibold text-foreground"
                : "text-muted-foreground",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function ActiveNavLinks() {
  const pathname = usePathname();

  return <NavLinks pathname={pathname} />;
}

export function MainNav() {
  return (
    <Suspense fallback={<NavLinks pathname={null} />}>
      <ActiveNavLinks />
    </Suspense>
  );
}
