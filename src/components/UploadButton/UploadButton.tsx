import React from "react";

import * as styles from "./UploadButton.module.css";

export interface UploadButtonProps {
  onLoad(code: string): void;
}

export default function UploadButton({ onLoad }: UploadButtonProps) {
  const handleUpload = React.useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".ts,.tsx";
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;

      file.text().then(onLoad);
    };
    input.click();
  }, []);

  return (
    <button className={styles.uploadButton} type="button" onClick={handleUpload}>
      Upload .ts / .tsx
    </button>
  );
}
