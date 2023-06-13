import { Control, UseFormRegister, useWatch } from "react-hook-form";
import styles from "./styles.module.css";
import { Button } from "@/components/common/atoms/Button";
import { ContentFooter } from "@/components/common/molecules/ContentFooter";
import { Switch } from "@/components/common/atoms/Switch";
import { ScenarioInputSchema } from "@/domain/scenario/schema";

const SaveButton = ({
  name,
  control,
  onClickSave,
}: {
  name: "published";
  control: Control<ScenarioInputSchema>;
  onClickSave: (isPublish: boolean) => void;
}) => {
  const isPublish = useWatch({ name, control });
  return (
    <Button
      type={isPublish ? "button" : "submit"}
      variant="large"
      theme={isPublish ? "blue" : "dark"}
      onClick={() => {
        onClickSave(isPublish);
      }}
    >
      {isPublish ? "シナリオを公開する" : "下書き保存する"}
    </Button>
  );
};

export const PostFormFooter = ({
  control,
  isSubmitting,
  register,
  onClickSave,
  onClickDelete,
}: {
  control: Control<ScenarioInputSchema>;
  isSubmitting: boolean;
  register: UseFormRegister<any>;
  onClickSave: (isPublish: boolean) => void;
  onClickDelete?: () => void;
}) => {
  const name = "published";
  return (
    <ContentFooter>
      <fieldset className={styles.module} disabled={isSubmitting}>
        <div className={styles.save}>
          <SaveButton name={name} control={control} onClickSave={onClickSave} />
        </div>
        <div className={styles.status}>
          <label htmlFor={name}>公開ステータス</label>
          <Switch {...register(name)} id={name} />
        </div>
        {onClickDelete && (
          <div className={styles.delete}>
            <Button
              type="button"
              variant="large"
              theme="transparent"
              onClick={onClickDelete}
            >
              シナリオを削除する
            </Button>
          </div>
        )}
      </fieldset>
    </ContentFooter>
  );
};
