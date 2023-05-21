import clsx from "clsx";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

type Props = {
  theme?: "dark" | "light" | "transparent" | "blue" | "error";
  variant?: "small" | "medium" | "large";
  disabled?: boolean;
} & React.ComponentPropsWithoutRef<typeof Link>;

export const LinkButton = ({
  className,
  theme = "dark",
  variant = "medium",
  disabled,
  to,
  children,
  ...props
}: Props) => (
  <Link
    {...props}
    to={to}
    className={clsx(className, styles.module)}
    aria-disabled={disabled}
    data-theme={theme}
    data-variant={variant}
  >
    {children}
  </Link>
);
