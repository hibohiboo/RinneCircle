import { ReactElement } from "react";

import styles from "./styles.module.css";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const BasicLayout = (page: ReactElement) => {
  return (
    <>
      <div className={styles.root}>
        <Header></Header>
        <main>{page}</main>
      </div>

      <Footer />
    </>
  );
};
