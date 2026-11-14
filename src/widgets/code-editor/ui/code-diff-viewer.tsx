"use client";

import { DiffEditor } from "@monaco-editor/react";

import {
  defineEditorTheme,
  EDITOR_FONT_FAMILY,
  EDITOR_THEME_NAME,
} from "../lib/editor-theme";

type CodeDiffViewerProps = {
  original: string | undefined;
  modified: string;
  originalLabel: string;
  modifiedLabel: string;
};

export function CodeDiffViewer({
  original,
  modified,
  originalLabel,
  modifiedLabel,
}: CodeDiffViewerProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="grid h-9 shrink-0 grid-cols-2 border-b border-border text-[13px]">
        <span className="flex items-center gap-2 px-5 text-muted-foreground">
          <span
            aria-hidden="true"
            className="size-2 rounded-full bg-destructive"
          />
          {originalLabel}
        </span>
        <span className="flex items-center gap-2 border-l border-border px-5 text-muted-foreground">
          <span aria-hidden="true" className="size-2 rounded-full bg-success" />
          {modifiedLabel}
        </span>
      </div>

      <div className="min-h-0 flex-1">
        {original === undefined ? (
          <p className="px-5 py-4 text-[13px] text-muted-foreground">
            다른 탭에서 저장한 코드를 불러오고 있어요
          </p>
        ) : (
          <DiffEditor
            language="javascript"
            theme={EDITOR_THEME_NAME}
            original={original}
            modified={modified}
            beforeMount={defineEditorTheme}
            loading={
              <span className="text-[13px] text-muted-foreground">
                비교 화면을 불러오고 있어요
              </span>
            }
            options={{
              readOnly: true,
              originalEditable: false,
              renderSideBySide: true,
              useInlineViewWhenSpaceIsLimited: true,
              fontSize: 14,
              lineHeight: 24,
              fontFamily: EDITOR_FONT_FAMILY,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              padding: { top: 16, bottom: 16 },
              automaticLayout: true,
              renderOverviewRuler: false,
              scrollbar: {
                verticalScrollbarSize: 10,
                horizontalScrollbarSize: 10,
              },
            }}
          />
        )}
      </div>
    </div>
  );
}
