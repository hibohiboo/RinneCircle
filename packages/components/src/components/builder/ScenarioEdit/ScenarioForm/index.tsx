import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import styles from "./styles.module.css";
import { ScenarioFormInfo } from "./ScenarioFormInfo";

import { PostFormFooter } from "./PostFormFooter";
import { PostFormHeroImage } from "./PostFormHeroImage";
import {
  ScenarioInputSchema,
  ScenarioInputFormSchema,
} from "@rinne-components/domain/scenario/schema";
import { ChangeEvent } from "react";

type Props<T extends FieldValues = ScenarioInputSchema> = {
  title: string;
  defaultValues?: Partial<T>;
  children?: React.ReactNode;
  imageUrl?: string;
  onValid: SubmitHandler<T>;
  onInvalid?: SubmitErrorHandler<T>;
  onClickSave: (isPublish: boolean) => void;
  onChangeImage?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const ScenarioForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ScenarioInputSchema>({
    defaultValues: props.defaultValues,
    resolver: zodResolver(ScenarioInputFormSchema),
  });
  return (
    <form
      aria-label={props.title}
      className={styles.module}
      onSubmit={handleSubmit(props.onValid, props.onInvalid)}
    >
      <div className={styles.content}>
        <div className={styles.meta}>
          <ScenarioFormInfo
            register={register}
            control={control}
            errors={errors}
          />
          {props.onChangeImage && (
            <PostFormHeroImage
              name="imageUrl"
              defaultImageUrl={props.defaultValues?.imageUrl}
              error={errors.imageUrl?.message}
              onChangeImage={props.onChangeImage}
              imageUrl={props.imageUrl}
            />
          )}
        </div>
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
