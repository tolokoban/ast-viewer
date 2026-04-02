import { useCallback, useRef, useState } from "react";

import { useAst } from "./hooks/ast";
import { useCode } from "./hooks/code";

import * as styles from "./App.module.css";
import UploadButton from "./components/UploadButton";
import CodeEditor from "./components/CodeEditor";
import AstNode from "./components/AstNode";
import { isObject } from "@tolokoban/type-guards";
import React from "react";

export function App() {
  const [selection, setSelection] = React.useState<[start: number, end: number]>([0, 0]);
  const [code, setCode] = useCode();
  const ast = useAst(code);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.header}>
          <h1>AST Viewer</h1>
          <UploadButton onLoad={setCode} />
        </div>
        <CodeEditor value={code} onChange={setCode} selection={selection} />
      </div>
      <div className={styles.right}>
        {!ast && <div>Parsing...</div>}
        {isObject(ast) && (
          <div>
            {Object.keys(ast).map((key) => (
              <AstNode
                key={key}
                attName={key}
                attValue={ast[key]}
                onSelect={(start, end) => setSelection([start, end])}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
