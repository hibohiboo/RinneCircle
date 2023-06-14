import Pen from "./assets/Pen.svg";
import styles from "./styles.module.css";

export const Heading = () => {
  return (
    <h1 className={styles.heading}>
      <a>
        <span className={styles.icon}>
          <img src={Pen} />
        </span>
        Rinne Circle
      </a>
    </h1>
  );
};
