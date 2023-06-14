import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import styles from "./styles.module.css";

import { TextboxWithInfo } from "./TextboxWithInfo";
import { WatchCounter } from "../WatchCounter";
import { TextareaWithInfo } from "./TextareaWithInfo";
import { ScenarioInputSchema } from "@rinne-components/domain/scenario/schema";

type Props<T extends FieldValues = ScenarioInputSchema> = {
  register: UseFormRegister<T>;
  control: Control<T>;
  errors: FieldErrors<T>;
};

export const ScenarioFormInfo = ({ register, control, errors }: Props) => {
  return (
    <div className={styles.info}>
      <TextboxWithInfo
        {...register("title")}
        title="シナリオタイトル"
        className={styles.title}
        maxLength={64}
        info={<WatchCounter max={64} name="title" control={control} />}
        error={errors.title?.message}
      />
      <TextareaWithInfo
        {...register("description")}
        title="シナリオ概要"
        className={styles.description}
        rows={2}
        maxLength={128}
        info={<WatchCounter max={128} name="description" control={control} />}
        error={errors.description?.message}
      />
    </div>
  );
};
