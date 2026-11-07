import Link from "next/link";

import { Button } from "@/shared/ui/button";

export function GuestActions() {
  return (
    <>
      <Link href="/login" className="flex h-11 items-center px-3.5 text-[15px] font-semibold text-foreground">
        로그인
      </Link>
      <Button asChild className="text-[15px]">
        <Link href="/signup">시작하기</Link>
      </Button>
    </>
  );
}
