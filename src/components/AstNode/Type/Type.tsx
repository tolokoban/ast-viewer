import React from "react";

import * as styles from "./Type.module.css";
import { isType } from "@tolokoban/type-guards";

export interface TypeProps {
  value: unknown;
}

export default function Type({ value }: TypeProps) {
  if (!isType(value, { type: "string" })) return null;

  return <div className={styles.type}>{value.type}</div>;
}
