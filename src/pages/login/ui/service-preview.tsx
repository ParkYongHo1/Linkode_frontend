"use client";

import { useEffect, useState } from "react";

import { cn } from "@/shared/lib/utils";

import { PreviewDiff } from "./preview-diff";
import { PreviewHint } from "./preview-hint";
import { PreviewTimeout } from "./preview-timeout";

const INTERVAL_MS = 5000;
const FEATURES = [
  {
    title: "정답 대신 단계별 힌트",
    description: "방향, 위치, 거의 정답 순서로 필요한 만큼만 열어봐요.",
    Preview: PreviewHint,
  },
  {
    title: "AI 제안은 줄 단위로 골라서",
    description:
      "3단계 힌트의 코드 제안을 에디터에서 한 곳씩 수락하거나 거절해요.",
    Preview: PreviewDiff,
  },
  {
    title: "무한루프여도 화면이 멈추지 않아요",
    description:
      "코드는 브라우저에서 따로 실행되고, 5초가 지나면 알아서 멈춰요.",
    Preview: PreviewTimeout,
  },
];

export function ServicePreview() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const ActivePreview = FEATURES[activeIndex].Preview;

  useEffect(() => {
    if (isPaused) return;

    const timerId = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % FEATURES.length);
    }, INTERVAL_MS);

    return () => clearTimeout(timerId);
  }, [activeIndex, isPaused]);
  return (
    <section
      aria-label="서비스 미리보기"
      className="flex min-w-0 flex-col gap-8 md:flex-[1_1_560px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        key={activeIndex}
        aria-hidden="true"
        className="hidden animate-in duration-300 fade-in motion-reduce:animate-none md:block"
      >
        <ActivePreview />
      </div>

      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {FEATURES.map((feature, index) => {
          const isActive = index === activeIndex;

          return (
            <li
              key={feature.title}
              className={cn(
                "flex flex-col transition-colors",
                isActive
                  ? "border-t-2 border-foreground pt-4"
                  : "border-t border-border pt-[17px]",
              )}
            >
              <h2
                className={cn(
                  "text-base leading-6 font-semibold transition-colors",
                  !isActive && "text-muted-foreground",
                )}
              >
                {feature.title}
              </h2>
              <p className="mt-1.5 text-sm leading-[22px] text-muted-foreground">
                {feature.description}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
