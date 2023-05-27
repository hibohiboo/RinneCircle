import { SelectFilterOption } from "@/components/molecules/SelectFilterOption";
import { parseAsNonEmptyString } from "@/lib/util";
import styles from "./styles.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";

const options = [
  { value: "all", label: "すべて" },
  { value: "public", label: "公開" },
  { value: "private", label: "下書き" },
];

export const Header = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultValue =
    parseAsNonEmptyString(searchParams.get("status")) || "all";
  return (
    <header className={styles.header}>
      <h2 className={styles.heading}>投稿記事一覧</h2>
      <SelectFilterOption
        title="公開ステータス"
        options={options}
        selectProps={{
          defaultValue,
          onChange: (event) => {
            const status = event.target.value;
            searchParams.set("status", status);
            navigate({
              pathname: `/my/posts`,
              search: searchParams.toString(),
            });
          },
        }}
      />
    </header>
  );
};
