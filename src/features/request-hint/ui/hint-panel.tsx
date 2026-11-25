"use client";

import Link from "next/link";
import { useState } from "react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Markdown } from "@/shared/ui/markdown";

import { HINT_STAGE_LABEL, HINT_STAGES } from "../config/hint-stages";
import type { HintsByStage, StageHint } from "../model/hint-state";
import type { HintStage } from "../model/types";

type HintPanelProps = {
  hints: HintsByStage;
  currentVersion: number;
  isLoggedIn: boolean;
  remaining: number;
  onRequest: (stage: HintStage) => void;
  onAbort: () => void;
};

function findNextStage(hints: HintsByStage): HintStage | null {
  return (
    HINT_STAGES.find((stage) => hints[stage]?.status !== "completed") ?? null
  );
}

function findLatestStage(hints: HintsByStage): HintStage {
  const opened = HINT_STAGES.filter((stage) => hints[stage]);
  return opened[opened.length - 1] ?? 1;
}

export function HintPanel({
  hints,
  currentVersion,
  isLoggedIn,
  remaining,
  onRequest,
  onAbort,
}: HintPanelProps) {
  const [selectedStage, setSelectedStage] = useState<HintStage | null>(null);

  const viewingStage = selectedStage ?? findLatestStage(hints);
  const viewingHint = hints[viewingStage];
  const nextStage = findNextStage(hints);
  const isStreaming = HINT_STAGES.some(
    (stage) => hints[stage]?.status === "streaming",
  );

  function handleRequest(stage: HintStage) {
    setSelectedStage(null);
    onRequest(stage);
  }

  return (
    <aside
      aria-label="AI 힌트"
      className="flex w-[400px] shrink-0 flex-col border-l border-border"
    >
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-border px-6">
        <h2 className="text-[15px] font-semibold">AI 힌트</h2>
        {isLoggedIn && (
          <span className="text-[13px] text-muted-foreground">
            오늘 {remaining}회 남음
          </span>
        )}
      </div>

      <ol
        aria-label="힌트 단계"
        className="grid shrink-0 grid-cols-3 gap-1.5 px-6 pt-5"
      >
        {HINT_STAGES.map((stage) => {
          const hint = hints[stage];
          const isViewing = stage === viewingStage && !!hint;

          return (
            <li key={stage}>
              <button
                type="button"
                disabled={!hint}
                aria-current={isViewing ? "step" : undefined}
                onClick={() => setSelectedStage(stage)}
                className="flex w-full flex-col gap-1.5 text-left disabled:cursor-default"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-1 rounded-full",
                    hint ? "bg-primary" : "bg-border",
                  )}
                />
                <span
                  className={cn(
                    "text-[13px]",
                    isViewing && "font-semibold text-foreground",
                    !isViewing && hint && "text-muted-foreground",
                    !hint && "text-subtle",
                  )}
                >
                  {stage} {HINT_STAGE_LABEL[stage]}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div
        aria-live="polite"
        className="flex min-h-0 flex-1 flex-col gap-3.5 overflow-y-auto px-6 py-5"
      >
        {viewingHint ? (
          <HintBody
            stage={viewingStage}
            hint={viewingHint}
            currentVersion={currentVersion}
          />
        ) : (
          <div className="flex flex-col gap-2 pt-3">
            <span className="text-[17px] leading-[26px] font-bold">
              막혔다면 힌트를 열어보세요
            </span>
            <p className="text-sm leading-[22px] text-muted-foreground">
              정답을 바로 알려주지 않아요. 방향부터 하나씩 알려줘요.
            </p>
            <p className="mt-1 text-[13px] leading-5 text-muted-foreground">
              함께 보내는 내용: 문제 설명, 지금 코드, 마지막 에러
            </p>
          </div>
        )}
      </div>

      <div className="flex shrink-0 flex-col gap-2.5 border-t border-border px-6 pt-4 pb-5">
        {!isLoggedIn ? (
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-muted-foreground">
              로그인하면 힌트를 받을 수 있어요
            </span>
            <Button asChild variant="outline">
              <Link href="/login">로그인</Link>
            </Button>
          </div>
        ) : isStreaming ? (
          <div className="flex items-center justify-between gap-3">
            <span
              role="status"
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <span
                aria-hidden="true"
                className="size-3.5 animate-spin rounded-full border-2 border-border border-t-primary"
              />
              힌트를 받고 있어요
            </span>
            <Button type="button" variant="outline" onClick={onAbort}>
              중단
            </Button>
          </div>
        ) : nextStage === null ? (
          <p className="text-center text-sm text-muted-foreground">
            세 단계 힌트를 모두 열었어요
          </p>
        ) : remaining <= 0 ? (
          <>
            <Button type="button" size="lg" disabled>
              {nextStage}단계 힌트 보기 · {HINT_STAGE_LABEL[nextStage]}
            </Button>
            <p className="text-center text-[13px] text-muted-foreground">
              오늘 힌트를 모두 썼어요 · 내일 다시 열려요
            </p>
          </>
        ) : (
          <Button
            type="button"
            size="lg"
            onClick={() => handleRequest(nextStage)}
          >
            {nextStage}단계 힌트 보기 · {HINT_STAGE_LABEL[nextStage]}
          </Button>
        )}
      </div>
    </aside>
  );
}

type HintBodyProps = {
  stage: HintStage;
  hint: StageHint;
  currentVersion: number;
};

function HintBody({ stage, hint, currentVersion }: HintBodyProps) {
  const isStale =
    hint.status === "completed" && hint.codeVersion !== currentVersion;

  return (
    <>
      {isStale && (
        <div
          role="status"
          className="flex flex-col gap-1.5 rounded-[10px] border border-warning/40 px-3.5 py-3"
        >
          <span className="flex items-center gap-2 text-sm font-semibold">
            <span
              aria-hidden="true"
              className="size-2 shrink-0 rounded-full bg-warning"
            />
            힌트를 받은 뒤에 코드가 바뀌었어요
          </span>
          <p className="text-[13px] leading-5 text-muted-foreground">
            이 힌트는 이전 코드(버전 {hint.codeVersion}) 기준이에요. 지금 코드는
            버전 {currentVersion}이에요.
          </p>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <span className="text-[13px] font-semibold text-primary-strong">
          {stage}단계 · {HINT_STAGE_LABEL[stage]}
        </span>
        {hint.text ? (
          <Markdown className={cn(isStale && "text-subtle")}>
            {hint.text}
          </Markdown>
        ) : (
          hint.status === "streaming" && (
            <span
              aria-hidden="true"
              className="h-4 w-[7px] animate-pulse bg-primary"
            />
          )
        )}
      </div>

      {hint.status === "aborted" && (
        <p
          role="status"
          className="text-[13px] leading-5 text-muted-foreground"
        >
          힌트를 중단했어요. 여기까지 받은 내용은 남겨뒀어요.
        </p>
      )}

      {hint.status === "failed" && (
        <div
          role="alert"
          className="flex flex-col gap-1.5 rounded-[10px] bg-destructive-weak px-3.5 py-3"
        >
          <span className="text-sm font-semibold text-foreground">
            힌트를 끝까지 받지 못했어요
          </span>
          <p className="text-[13px] leading-5 text-body">
            받은 데까지는 남겨뒀고, 이번 요청은 남은 횟수에서 빼지 않았어요.
          </p>
        </div>
      )}
    </>
  );
}
