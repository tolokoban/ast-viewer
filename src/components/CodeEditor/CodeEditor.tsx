import React from "react";
import { useHighlighter } from "./hooks/highlighter";

import { classNames } from "@/utils";

import * as styles from "./CodeEditor.module.css";

export interface CodeEditorProps {
  className?: string;
  value: string;
  selection: [start: number, end: number];
  onChange(value: string): void;
}

export default function CodeEditor({ className, selection, value, onChange }: CodeEditorProps) {
  const highlighter = useHighlighter();
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const highlightRef = React.useRef<HTMLDivElement>(null);
  const selectionRef = React.useRef<HTMLDivElement>(null);
  const handleScroll = () => {
    const { current: ta } = textareaRef;
    if (!ta) return;
    const top = ta.scrollTop;
    const left = ta.scrollLeft;
    if (highlightRef.current) {
      highlightRef.current.scrollTop = top;
      highlightRef.current.scrollLeft = left;
    }
    if (selectionRef.current) {
      selectionRef.current.scrollTop = top;
      selectionRef.current.scrollLeft = left;
    }
  };
  const highlighted = highlighter
    ? highlighter.codeToHtml(value, { lang: "tsx", theme: "catppuccin-mocha" })
    : `<pre style="color:#cdd6f4">${escapeHtml(value)}</pre>`;

  const [start, end] = selection;
  const selectionHtml =
    start < end
      ? `<pre><code>${escapeHtml(value.slice(0, start))}<mark>${escapeHtml(value.slice(start, end))}</mark>${escapeHtml(value.slice(end))}</code></pre>`
      : "";

  React.useEffect(() => {
    const mark = selectionRef.current?.querySelector("mark");
    if (!mark || !textareaRef.current) return;
    const container = textareaRef.current;
    const markRect = mark.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    if (
      markRect.top >= containerRect.top &&
      markRect.bottom <= containerRect.bottom &&
      markRect.left >= containerRect.left &&
      markRect.right <= containerRect.right
    ) return;
    const scrollTop = container.scrollTop + markRect.top - containerRect.top;
    const scrollLeft = container.scrollLeft + markRect.left - containerRect.left;
    container.scrollTop = scrollTop;
    container.scrollLeft = scrollLeft;
    handleScroll();
  }, [start, end]);

  return (
    <div className={classNames(className, styles.codeEditor)}>
      <div
        ref={highlightRef}
        className={styles.highlight}
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />
      {selectionHtml && (
        <div
          ref={selectionRef}
          className={styles.selectionLayer}
          dangerouslySetInnerHTML={{ __html: selectionHtml }}
        />
      )}
      <textarea
        ref={textareaRef}
        className={styles.editor}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onScroll={handleScroll}
        spellCheck={false}
      />
    </div>
  );
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
