import Link from "next/link";

import { LoginForm } from "@/features/login";

import { DemoEntry } from "./demo-entry";
import { ServicePreview } from "./service-preview";

export function LoginPage() {
  return (
    <main className="mx-auto flex w-full max-w-[1200px] flex-1 flex-wrap items-start gap-24 px-12 pt-20 pb-24">
      <section aria-labelledby="login-title" className="flex min-w-0 flex-[0_1_400px] flex-col">
        <h1 id="login-title" className="text-[28px] leading-[38px] font-bold tracking-[-0.5px]">
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
