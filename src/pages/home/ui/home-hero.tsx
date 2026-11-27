import { Suspense } from "react";
import { ChevronRight } from "lucide-react";

import { HINT_STAGES, HINT_STAGE_LABEL } from "@/features/request-hint";

import { HeroActions, ProblemsButton } from "./hero-actions";

export function HomeHero() {
  return (
    <section
      aria-labelledby="home-title"
      className="flex flex-col pt-12 pb-14 md:pt-24 md:pb-20"
    >
      <span className="text-[15px] font-semibold text-primary-strong">
        JavaScript 코딩 실습
      </span>
      <h1
        id="home-title"
        className="mt-3 text-[32px] leading-[42px] font-bold tracking-[-0.8px] md:text-[48px] md:leading-[62px] md:tracking-[-1.2px]"
      >
        막혔을 때 정답 말고,
        <br />
        다음 한 걸음만 알려드려요
      </h1>
      <p className="mt-4 max-w-[560px] text-base leading-[26px] text-muted-foreground md:mt-5 md:text-lg md:leading-[29px]">
        브라우저에서 바로 코드를 실행하고 채점해요. 풀다가 막히면 지금 내
        코드를 보고 AI가 단계별로 힌트를 줘요.
      </p>

      <ol
        aria-label="힌트 단계"
        className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-[15px] md:mt-10"
      >
        {HINT_STAGES.map((stage, index) => (
          <li key={stage} className="flex items-center gap-2">
            <span className="flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-full bg-primary-weak text-[13px] font-bold text-primary-strong tabular-nums">
                {stage}
              </span>
              <span className="font-semibold text-foreground">
                {HINT_STAGE_LABEL[stage]}
              </span>
            </span>
            {index < HINT_STAGES.length - 1 && (
              <ChevronRight aria-hidden="true" className="size-4 text-subtle" />
            )}
          </li>
        ))}
      </ol>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center md:mt-12">
        <Suspense fallback={<ProblemsButton />}>
          <HeroActions />
        </Suspense>
      </div>
    </section>
  );
}
