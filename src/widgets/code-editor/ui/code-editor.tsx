"use client";

import Editor, { type BeforeMount, type OnChange } from "@monaco-editor/react";

const THEME_NAME = "linkode-light";

const defineTheme: BeforeMount = (monaco) => {
  monaco.editor.defineTheme(THEME_NAME, {
    base: "vs",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#ffffff",
      "editor.foreground": "#191f28",
      "editorLineNumber.foreground": "#8b95a1",
      "editorLineNumber.activeForeground": "#4e5968",
      "editor.lineHighlightBackground": "#f9fafb",
      "editor.lineHighlightBorder": "#00000000",
      "editorCursor.foreground": "#3182f6",
      "editor.selectionBackground": "#e8f3ff",
      "editorIndentGuide.background1": "#f2f4f6",
    },
  });
};

type CodeEditorProps = {
  defaultValue: string;
  onChange?: OnChange;
};

export function CodeEditor({ defaultValue, onChange }: CodeEditorProps) {
  return (
    <Editor
      language="javascript"
      theme={THEME_NAME}
      defaultValue={defaultValue}
      onChange={onChange}
      beforeMount={defineTheme}
      loading={
        <span className="text-[13px] text-muted-foreground">
          에디터를 불러오고 있어요
        </span>
      }
      options={{
        fontSize: 14,
        lineHeight: 24,
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
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
