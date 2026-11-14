import type { BeforeMount } from "@monaco-editor/react";

export const EDITOR_THEME_NAME = "linkode-light";

export const EDITOR_FONT_FAMILY =
  "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

export const defineEditorTheme: BeforeMount = (monaco) => {
  monaco.editor.defineTheme(EDITOR_THEME_NAME, {
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
      "diffEditor.insertedLineBackground": "#e9f8f1",
      "diffEditor.insertedTextBackground": "#c6f0dc",
      "diffEditor.removedLineBackground": "#feeff0",
      "diffEditor.removedTextBackground": "#fbd5d8",
    },
  });
};
