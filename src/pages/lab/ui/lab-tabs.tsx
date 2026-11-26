"use client";

import { useState, type ReactNode } from "react";

import { cn } from "@/shared/lib/utils";

type LabTab = "problem" | "code";

const TABS: { value: LabTab; label: string }[] = [
  { value: "problem", label: "문제" },
  { value: "code", label: "코드" },
];

type LabTabsProps = {
  problem: ReactNode;
  editor: ReactNode;
};

export function LabTabs({ problem, editor }: LabTabsProps) {
  const [activeTab, setActiveTab] = useState<LabTab>("code");

  return (
    <div className="flex min-h-0 flex-1 flex-col md:flex-row">
      <div
        role="tablist"
        aria-label="실습 화면"
        className="grid h-12 shrink-0 grid-cols-2 border-b border-border md:hidden"
      >
        {TABS.map((tab) => {
          const isActive = tab.value === activeTab;

          return (
            <button
              key={tab.value}
              type="button"
              role="tab"
              id={`lab-tab-${tab.value}`}
              aria-selected={isActive}
              aria-controls={`lab-panel-${tab.value}`}
              onClick={() => setActiveTab(tab.value)}
              className={cn(
                "text-[15px]",
                isActive
                  ? "font-semibold text-foreground shadow-[inset_0_-2px_0_var(--foreground)]"
                  : "font-medium text-muted-foreground",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id="lab-panel-problem"
        aria-labelledby="lab-tab-problem"
        className={cn(
          "min-h-0 flex-1 md:flex md:flex-none",
          activeTab === "problem" ? "flex" : "hidden",
        )}
      >
        {problem}
      </div>

      <div
        role="tabpanel"
        id="lab-panel-code"
        aria-labelledby="lab-tab-code"
        className={cn(
          "min-h-0 min-w-0 flex-1 md:flex",
          activeTab === "code" ? "flex" : "hidden",
        )}
      >
        {editor}
      </div>
    </div>
  );
}
