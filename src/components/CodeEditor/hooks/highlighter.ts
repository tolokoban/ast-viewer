import { useEffect, useRef, useState } from "react";
import { createHighlighter, type Highlighter } from "shiki";

let cached: Highlighter | null = null;

export function useHighlighter() {
  const [highlighter, setHighlighter] = useState<Highlighter | null>(cached);
  const loading = useRef(false);

  useEffect(() => {
    if (cached || loading.current) return;
    loading.current = true;
    createHighlighter({ themes: ["catppuccin-mocha"], langs: ["typescript", "tsx"] }).then((h) => {
      cached = h;
      setHighlighter(h);
    });
  }, []);

  return highlighter;
}
