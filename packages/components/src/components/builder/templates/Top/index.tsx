import React from "react";
import styles from "./styles.module.css";

export function RinneBuilderTop({ children }: { children?: React.ReactNode }) {
  return <div className={styles.module}>{children}</div>;
}
