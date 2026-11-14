import Link from "next/link";

import { LoginForm } from "@/features/login";

import { DemoEntry } from "./demo-entry";
import { ServicePreview } from "./service-preview";

export function LoginPage() {
  return (
    <main className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col items-stretch gap-14 px-5 pt-8 pb-14 md:flex-row md:flex-wrap md:items-start md:gap-24 md:px-12 md:pt-20 md:pb-24">
      <section aria-labelledby="login-title" className="flex min-w-0 flex-col md:flex-[0_1_400px]">
        <h1 id="login-title" className="text-2xl leading-[34px] font-bold tracking-[-0.4px] md:text-[28px] md:leading-[38px] md:tracking-[-0.5px]">
          로그인
        </h1>
        <p className="mt-2 text-[15px] leading-6 text-muted-foreground">
          로그인하면 작성한 코드가 저장되고, AI 힌트를 받을 수 있어요.
        </p>

        <LoginForm />

        <p className="mt-7 border-t border-border pt-6 text-[15px] text-muted-foreground">
          아직 계정이 없나요?{" "}
          <Link href="/signup" className="font-semibold text-primary-strong hover:underline">
            회원가입
          </Link>
        </p>

        <DemoEntry />
      </section>

      <ServicePreview />
    </main>
  );
}
