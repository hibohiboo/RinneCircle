import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import styles from "./styles.module.css";
import { ScenarioFormInfo } from "./ScenarioFormInfo";

import { TextareaWithInfo } from "./ScenarioFormInfo/TextareaWithInfo";
import { PostFormFooter } from "./PostFormFooter";
import { PostFormHeroImage } from "./PostFormHeroImage";
import {
  ScenarioInputSchema,
  updateScenarioInputSchema,
} from "@/domain/scenario/schema";

type Props<T extends FieldValues = ScenarioInputSchema> = {
  title: string;
  defaultValues?: Partial<T>;
  children?: React.ReactNode;
  onValid: SubmitHandler<T>;
  onInvalid?: SubmitErrorHandler<T>;
  onClickSave: (isPublish: boolean) => void;
};

export const PostForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ScenarioInputSchema>({
    defaultValues: props.defaultValues,
    resolver: zodResolver(updateScenarioInputSchema),
  });
  return (
    <form
      aria-label={props.title}
      className={styles.module}
      onSubmit={() => {
        handleSubmit;
      }}
    >
      <div className={styles.content}>
        <div className={styles.meta}>
          <ScenarioFormInfo
            register={register}
            control={control}
            errors={errors}
          />
          <PostFormHeroImage
            name="imageUrl"
            defaultImageUrl={props.defaultValues?.imageUrl}
            error={errors.imageUrl?.message}
            onChangeImage={() => {}}
            imageUrl={""}
          />
        </div>
        <TextareaWithInfo
          {...register("title")}
          title="本文"
          rows={20}
          error={errors.title?.message}
        />
      </div>
      <PostFormFooter
        isSubmitting={isSubmitting}
        register={register}
        control={control}
        onClickSave={props.onClickSave}
      />
      {props.children}
    </form>
  );
};
