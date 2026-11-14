"use client";

import { LogOut, User } from "lucide-react";

import { logout } from "@/features/logout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

type AccountMenuProps = {
  label?: string;
  initial?: string;
};

export function AccountMenu({ label, initial }: AccountMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="내 계정 메뉴"
          className="flex size-11 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          <span className="flex size-7 items-center justify-center rounded-full bg-primary-weak text-[13px] font-semibold text-primary-strong">
            {initial ?? <User aria-hidden="true" className="size-4" />}
          </span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {label && (
          <>
            <DropdownMenuLabel className="truncate">{label}</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        <form action={logout}>
          <DropdownMenuItem asChild>
            <button type="submit">
              <LogOut aria-hidden="true" className="size-4 text-subtle" />
              로그아웃
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
