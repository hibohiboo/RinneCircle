import { Link, useLocation } from "react-router-dom";
import { AnchorHTMLAttributes } from "react";
import styles from "./styles.module.css";

function isCurrent(flag: boolean): AnchorHTMLAttributes<HTMLAnchorElement> {
  if (!flag) return {};
  return { "aria-current": "page" };
}

type Props = { onCloseMenu: () => void };

export const Nav = ({ onCloseMenu }: Props) => {
  const { pathname } = useLocation();

  return (
    <nav aria-label="ナビゲーション" className={styles.nav}>
      <button
        aria-label="メニューを閉じる"
        className={styles.closeMenu}
        onClick={onCloseMenu}
      ></button>
      <ul className={styles.list}>
        <li>
          <Link
            to={`/my/posts`}
            {...isCurrent(
              pathname.startsWith("/my/posts") &&
                pathname !== "/my/posts/create",
            )}
          >
            My Posts
          </Link>
        </li>
        <li>
          <Link
            to={`/my/posts/create`}
            {...isCurrent(pathname === "/my/posts/create")}
          >
            Create Post
          </Link>
        </li>
      </ul>
    </nav>
  );
};
