import Link from "next/link";

import { getCurrentUser } from "@/entities/session";
import { Button } from "@/shared/ui/button";

export function ProblemsButton() {
  return (
    <Button asChild size="lg" className="w-full sm:w-auto">
      <Link href="/problems">실습 문제 보기</Link>
    </Button>
  );
}

export async function HeroActions() {
  const user = await getCurrentUser();

  return (
    <>
      <ProblemsButton />
      {!user && (
        <Link
          href="/login"
          className="flex h-12 items-center justify-center px-2 text-[15px] font-semibold text-muted-foreground hover:text-foreground sm:justify-start"
        >
          가입 없이 체험해보기
        </Link>
      )}
    </>
  );
}
