import { parseAsPositiveInt } from "@/lib/util";
import { PaginationProps } from "@/lib/util/pagination";
import { AnchorHTMLAttributes } from "react";
import styles from "./styles.module.css";
import { Link, useSearchParams } from "react-router-dom";

function isCurrent(
  a: number,
  b: number,
): AnchorHTMLAttributes<HTMLAnchorElement> {
  return {
    "aria-current": (a == 0 && b == 1) || a == b ? "page" : undefined,
  };
}

export const Pagination = ({
  pathname,
  pagination,
}: {
  pathname: string;
  pagination: PaginationProps;
}) => {
  const [searchParams] = useSearchParams();
  const page = parseAsPositiveInt(searchParams.get("page")) || 0;
  if (!pagination) return null;
  return (
    <nav aria-label="ページネーション">
      <ul className={styles.pagination}>
        {pagination?.items.map((item, index) => (
          <li key={index}>
            {typeof item === "number" ? (
              <Link
                to={{ pathname, search: `?page=${item}` }}
                {...isCurrent(page, item)}
              >
                {item.toString()}
              </Link>
            ) : (
              <span>{item.toString()}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
