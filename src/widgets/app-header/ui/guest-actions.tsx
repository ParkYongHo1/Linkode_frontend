import Link from "next/link";

import { Button } from "@/shared/ui/button";

export function GuestActions() {
  return (
    <>
      <Link href="/login" className="flex h-11 items-center px-3 text-[15px] font-semibold text-foreground md:px-3.5">
        로그인
      </Link>
      <Button asChild className="hidden text-[15px] md:inline-flex">
        <Link href="/signup">시작하기</Link>
      </Button>
    </>
  );
}
