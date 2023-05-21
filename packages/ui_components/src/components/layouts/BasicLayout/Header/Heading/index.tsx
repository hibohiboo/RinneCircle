import { Link } from "react-router-dom";
import Pen from "./assets/Pen.svg";
import styles from "./styles.module.css";

export const Heading = () => {
  return (
    <h1 className={styles.heading}>
      <Link to={`/`}>
        <span className={styles.icon}>
          <Pen />
        </span>
        Tech Posts
      </Link>
    </h1>
  );
};
