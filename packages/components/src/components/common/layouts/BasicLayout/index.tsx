import { ReactElement } from "react";

import styles from "./styles.module.css";

export const BasicLayout = (page: ReactElement) => {
  return (
    <div className={styles.root}>
      <main>{page}</main>
    </div>
  );
};
