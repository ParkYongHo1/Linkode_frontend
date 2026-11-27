import Link from "next/link";

import { getCurrentUser } from "@/entities/session";
import { DemoLoginButton } from "@/features/demo-login";
import { Button } from "@/shared/ui/button";

export async function HomeCta() {
  const user = await getCurrentUser();

  return (
    <section
      aria-labelledby="home-cta-title"
      className="flex flex-col gap-8 border-t border-border py-14 md:flex-row md:items-end md:justify-between md:py-20"
    >
      <div className="flex flex-col">
        <h2
          id="home-cta-title"
          className="text-2xl leading-[34px] font-bold tracking-[-0.4px] md:text-[30px] md:leading-[40px] md:tracking-[-0.6px]"
        >
          {user ? "다음 문제를 풀어볼까요?" : "가입 없이 바로 풀어볼 수 있어요"}
        </h2>
        <p className="mt-3 text-[15px] leading-6 text-muted-foreground md:text-base md:leading-[26px]">
          {user
            ? "푼 문제와 이어서 하던 실습은 문제 목록에서 확인할 수 있어요."
            : "체험 계정으로도 코드 저장과 AI 힌트까지 써볼 수 있어요."}
        </p>
      </div>
      {user ? (
        <Button asChild size="lg" className="w-full md:w-auto">
          <Link href="/problems">실습 문제 보기</Link>
        </Button>
      ) : (
        <div className="flex w-full flex-col gap-3 md:w-[360px]">
          <DemoLoginButton />
          <Link
            href="/problems"
            className="text-center text-[15px] font-semibold text-muted-foreground hover:text-foreground"
          >
            로그인 없이 문제만 보기
          </Link>
        </div>
      )}
    </section>
  );
}
