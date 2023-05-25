import { SelectFilterOption } from "@/components/molecules/SelectFilterOption";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

export const OrderBy = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderBy = queryParams.get("orderBy") || "";
  return (
    <SelectFilterOption
      title="並び順"
      className={styles.module}
      selectProps={{
        defaultValue: orderBy,
        onChange: (event) => {
          queryParams.set("orderBy", event.target.value);
          navigate({ search: queryParams.toString() });
        },
      }}
      options={[
        { value: "updatedAt", label: "更新日時順" },
        { value: "starCount", label: "スター数順" },
      ]}
    />
  );
};
