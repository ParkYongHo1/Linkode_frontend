import { cn } from "@/shared/lib/utils";

import type { ConsoleLine, RunResult, TestResult } from "../model/types";
import { ConsoleOutput } from "./console-output";
import { TestResultList } from "./test-result-list";

export type ConsoleTab = "tests" | "console";

type ConsolePanelProps = {
  activeTab: ConsoleTab;
  onTabChange: (tab: ConsoleTab) => void;
  lines: ConsoleLine[];
  tests: TestResult[];
  totalTests: number;
  result: RunResult;
};

export function ConsolePanel({
  activeTab,
  onTabChange,
  lines,
  tests,
  totalTests,
  result,
}: ConsolePanelProps) {
  const passedCount = tests.filter((test) => test.status === "passed").length;
  const showCount = tests.length > 0 && result.status !== "running";

  const tabs: { value: ConsoleTab; label: string; count: string | null }[] = [
    {
      value: "tests",
      label: "테스트 결과",
      count: showCount ? `${passedCount}/${totalTests}` : null,
    },
    { value: "console", label: "콘솔", count: null },
  ];

  return (
    <section
      aria-label="실행 결과"
      className="flex h-40 shrink-0 flex-col border-t border-border md:h-[216px]"
    >
      <div
        role="tablist"
        aria-label="실행 결과 보기"
        className="flex h-11 shrink-0 items-stretch gap-5 border-b border-border px-5 md:px-6"
      >
        {tabs.map((tab) => {
          const isActive = tab.value === activeTab;

          return (
            <button
              key={tab.value}
              type="button"
              role="tab"
              id={`console-tab-${tab.value}`}
              aria-selected={isActive}
              aria-controls={`console-panel-${tab.value}`}
              onClick={() => onTabChange(tab.value)}
              className={cn(
                "flex items-center gap-1.5 text-sm",
                isActive
                  ? "font-semibold text-foreground shadow-[inset_0_-2px_0_var(--foreground)]"
                  : "font-medium text-muted-foreground",
              )}
            >
              {tab.label}
              {tab.count && (
                <span
                  className={cn(
                    "tabular-nums",
                    passedCount === totalTests
                      ? "text-success"
                      : "text-muted-foreground",
                  )}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`console-panel-${activeTab}`}
        aria-labelledby={`console-tab-${activeTab}`}
        aria-live="polite"
        className="min-h-0 flex-1 overflow-auto px-5 py-3 md:px-6"
      >
        {activeTab === "tests" ? (
          <TestResultList tests={tests} result={result} />
        ) : (
          <ConsoleOutput lines={lines} result={result} />
        )}
      </div>
    </section>
  );
}
