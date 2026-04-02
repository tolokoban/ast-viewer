import React from "react";

import * as styles from "./SelectButton.module.css";
import { isType } from "@tolokoban/type-guards";

export interface SelectButtonProps {
  value: unknown;
  onSelect(start: number, end: number): void;
}

export default function SelectButton({ value, onSelect }: SelectButtonProps) {
  if (!isType(value, { start: "number", end: "number" })) return null;

  return (
    <button
      className={styles.selectButton}
      type="button"
      onClick={() => onSelect(value.start, value.end)}
    >
      Select
    </button>
  );
}
