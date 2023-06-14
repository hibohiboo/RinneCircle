import styles from "./styles.module.css";

type Props = { onCloseMenu: () => void };

export const Nav = ({ onCloseMenu }: Props) => {
  return (
    <nav aria-label="ナビゲーション" className={styles.nav}>
      <button
        aria-label="メニューを閉じる"
        className={styles.closeMenu}
        onClick={onCloseMenu}
      ></button>
      <ul className={styles.list}>
        <li></li>
      </ul>
    </nav>
  );
};
