"use client";

import Editor, { type OnChange } from "@monaco-editor/react";

import {
  defineEditorTheme,
  EDITOR_FONT_FAMILY,
  EDITOR_THEME_NAME,
} from "../lib/editor-theme";

type CodeEditorProps = {
  defaultValue: string;
  onChange?: OnChange;
};

export function CodeEditor({ defaultValue, onChange }: CodeEditorProps) {
  return (
    <Editor
      language="javascript"
      theme={EDITOR_THEME_NAME}
      defaultValue={defaultValue}
      onChange={onChange}
      beforeMount={defineEditorTheme}
      loading={
        <span className="text-[13px] text-muted-foreground">
          에디터를 불러오고 있어요
        </span>
      }
      options={{
        fontSize: 14,
        lineHeight: 24,
        fontFamily: EDITOR_FONT_FAMILY,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        padding: { top: 16, bottom: 16 },
        tabSize: 2,
        automaticLayout: true,
        fixedOverflowWidgets: true,
        renderLineHighlight: "line",
        overviewRulerBorder: false,
        scrollbar: { verticalScrollbarSize: 10, horizontalScrollbarSize: 10 },
      }}
    />
  );
}
