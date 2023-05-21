import { LinkButton } from "@/components/atoms/LinkButton";
import { useLoginUserInfoState } from "@/components/providers/LoginUserInfo";
import clsx from "clsx";
import { memo } from "react";
import { Heading } from "./Heading";
import { LoginUser } from "./LoginUser";
import { Nav } from "./Nav";
import styles from "./styles.module.css";
import { useDrawerMenu } from "./useDrawerMenu";
import { useLocation } from "react-router-dom";

export const Header = memo(function HeaderBase() {
  const { value } = useLoginUserInfoState();
  const { menuRef, isOpen, handleCloseMenu, handleOpenMenu } = useDrawerMenu();
  const location = useLocation();
  return (
    <header className={styles.header}>
      <Heading />
      {value ? (
        <>
          <button
            aria-label="メニューを開く"
            aria-controls="drawer"
            aria-expanded={isOpen}
            className={styles.openMenu}
            onClick={handleOpenMenu}
          >
            <span />
          </button>
          <div
            id="drawer"
            ref={menuRef}
            className={clsx(styles.menu, isOpen && styles.isOpen)}
          >
            <Nav onCloseMenu={handleCloseMenu} />
            <LoginUser {...value} />
          </div>
        </>
      ) : (
        location.pathname !== "/login" && (
          <LinkButton to={"/login"}>ログイン</LinkButton>
        )
      )}
    </header>
  );
});
