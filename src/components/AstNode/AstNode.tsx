import React from "react";

import { classNames } from "@/utils";

import * as styles from "./AstNode.module.css";
import { isType } from "@tolokoban/type-guards";
import SelectButton from "./SelectButton";
import Type from "./Type";

export interface AstNodeProps {
  attName: string | number;
  attValue: unknown;
  path?: string;
  onSelect(start: number, end: number): void;
}

export default function AstNode({ attName, attValue, path = "", onSelect }: AstNodeProps) {
  path = path ? `${path}.${attName}` : `${attName}`;
  if (isAtomicType(attValue)) {
    return (
      <div className={styles.astNode} title={path}>
        <span className={styles.attName}>{attName}</span>
        <span
          className={classNames(
            styles.attValue,
            styles[typeof attValue],
            attValue === null && styles.null,
          )}
        >
          {JSON.stringify(attValue)}
        </span>
      </div>
    );
  }

  if (isType(attValue, ["map", "unknown"])) {
    const count = Object.keys(attValue).length;
    if (count === 0) {
      return (
        <div className={classNames(styles.astNode)} title={path}>
          <span className={styles.attName}>{attName}</span>
          <span className={classNames(styles.attValue, styles.object)}>Empty Object</span>
        </div>
      );
    }

    return (
      <details title={path} className={styles.details}>
        <summary>
          <div className={classNames(styles.inline, styles.astNode)} title={path}>
            <span className={styles.attName}>{attName}</span>
            <Type value={attValue} />
            <span className={classNames(styles.attValue, styles.object)}>
              Object ({count} item{count > 1 ? "s" : ""})
            </span>
            <SelectButton value={attValue} onSelect={onSelect} />
          </div>
        </summary>
        <div>
          {Object.keys(attValue).map((key) => (
            <AstNode
              key={key}
              attName={key}
              attValue={attValue[key]}
              path={path}
              onSelect={onSelect}
            />
          ))}
        </div>
      </details>
    );
  }

  if (Array.isArray(attValue)) {
    const count = attValue.length;
    if (count === 0) {
      return (
        <div className={classNames(styles.astNode)} title={path}>
          <span className={styles.attName}>{attName}</span>
          <span className={classNames(styles.attValue, styles.object)}>Empty Array</span>
        </div>
      );
    }

    return (
      <details title={path} className={styles.details}>
        <summary>
          <div className={classNames(styles.inline, styles.astNode)} title={path}>
            <span className={styles.attName}>{attName}</span>
            <span className={classNames(styles.attValue, styles.object)}>
              Array ({count} item{count > 1 ? "s" : ""})
            </span>
          </div>
        </summary>
        <div>
          {attValue.map((val, key) => (
            <AstNode key={key} attName={key} attValue={val} path={path} onSelect={onSelect} />
          ))}
        </div>
      </details>
    );
  }

  return (
    <div className={styles.astNode} title={path}>
      <span className={styles.attName}>{attName}</span>
      <pre className={styles.attValue}>{JSON.stringify(attValue, null, 2)}</pre>
      <SelectButton value={attValue} onSelect={onSelect} />
    </div>
  );
}

function isAtomicType(data: unknown): data is string | boolean | number | null {
  return data === null || ["string", "boolean", "number"].includes(typeof data);
}
