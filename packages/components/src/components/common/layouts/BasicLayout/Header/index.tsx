import { memo } from "react";
import styles from "./styles.module.css";
import { Heading } from "./Heading";
import { Nav } from "./Nav";
import { useDrawerMenu } from "./useDrawerMenu";
import { LoginUser } from "./LoginUser";

export const Header = memo(function HeaderBase() {
  const { handleCloseMenu } = useDrawerMenu();
  return (
    <header className={styles.header}>
      <Heading />
      <Nav onCloseMenu={handleCloseMenu} />
      <LoginUser />
    </header>
  );
});
