"use client";

import { useState } from "react";

import { HintPanel, type HintsByStage } from "@/features/request-hint";

const STAGE_1 =
  "이 문제는 **해시(Map)**로 한 번만 훑으면서 풀 수 있어요. 지금 코드는 이중 반복문으로 모든 쌍을 확인하는 방향이에요. 방향 자체는 틀리지 않았지만, 같은 원소를 두 번 쓰지 않는지 다시 살펴보세요.";

const STAGE_2 =
  "안쪽 반복문의 `j`가 `0`부터 시작해서, `i`와 `j`가 같은 경우도 검사하고 있어요. 그래서 `[3,3], 6`에서 같은 원소를 두 번 써서 `[0,0]`이 나와요.";

const SCENARIOS: Record<
  string,
  {
    hints: HintsByStage;
    currentVersion: number;
    remaining: number;
    isLoggedIn: boolean;
  }
> = {
  "받기 전": { hints: {}, currentVersion: 3, remaining: 10, isLoggedIn: true },
  "1단계 받는 중": {
    hints: {
      1: { status: "streaming", text: STAGE_1.slice(0, 60), codeVersion: 3 },
    },
    currentVersion: 3,
    remaining: 9,
    isLoggedIn: true,
  },
  "1단계 완료": {
    hints: { 1: { status: "completed", text: STAGE_1, codeVersion: 3 } },
    currentVersion: 3,
    remaining: 9,
    isLoggedIn: true,
  },
  "이전 코드 기준": {
    hints: { 1: { status: "completed", text: STAGE_1, codeVersion: 3 } },
    currentVersion: 5,
    remaining: 9,
    isLoggedIn: true,
  },
  "2단계 중단": {
    hints: {
      1: { status: "completed", text: STAGE_1, codeVersion: 3 },
      2: { status: "aborted", text: STAGE_2.slice(0, 50), codeVersion: 3 },
    },
    currentVersion: 3,
    remaining: 8,
    isLoggedIn: true,
  },
  "2단계 실패": {
    hints: {
      1: { status: "completed", text: STAGE_1, codeVersion: 3 },
      2: { status: "failed", text: STAGE_2.slice(0, 30), codeVersion: 3 },
    },
    currentVersion: 3,
    remaining: 9,
    isLoggedIn: true,
  },
  "횟수 소진": {
    hints: { 1: { status: "completed", text: STAGE_1, codeVersion: 3 } },
    currentVersion: 3,
    remaining: 0,
    isLoggedIn: true,
  },
  "3단계까지 완료": {
    hints: {
      1: { status: "completed", text: STAGE_1, codeVersion: 3 },
      2: { status: "completed", text: STAGE_2, codeVersion: 3 },
      3: {
        status: "completed",
        text: "`for (let j = i + 1; ...)`처럼 `i` 다음부터 보게 바꿔보세요.",
        codeVersion: 3,
      },
    },
    currentVersion: 3,
    remaining: 7,
    isLoggedIn: true,
  },
  비로그인: { hints: {}, currentVersion: 0, remaining: 0, isLoggedIn: false },
};

export function HintPanelDemo() {
  const [name, setName] = useState("받기 전");
  const scenario = SCENARIOS[name];

  return (
    <div className="relative flex">
      <select
        value={name}
        onChange={(event) => setName(event.target.value)}
        className="absolute top-3 right-28 z-10 rounded-md border border-border bg-background px-2 py-1 text-xs"
      >
        {Object.keys(SCENARIOS).map((key) => (
          <option key={key}>{key}</option>
        ))}
      </select>
      <HintPanel
        key={name}
        hints={scenario.hints}
        currentVersion={scenario.currentVersion}
        isLoggedIn={scenario.isLoggedIn}
        remaining={scenario.remaining}
        onRequest={(stage) => console.log("onRequest", stage)}
        onAbort={() => console.log("onAbort")}
      />
    </div>
  );
}
