import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import styles from "./styles.module.css";
import { ScenarioFormInfo } from "./ScenarioFormInfo";
import * as z from "zod";
import { ScenarioInput } from "@rinne-circle/backend";
import { TextareaWithInfo } from "./ScenarioFormInfo/TextareaWithInfo";
import { PostFormFooter } from "./PostFormFooter";

const updateScenarioInputSchema = z.object({});

type Props<T extends FieldValues = {}> = {
  title: string;
  defaultValues?: Partial<T>;
  children?: React.ReactNode;
  onClickSave: (isPublish: boolean) => void;
  onClickDelete?: () => void;
};
type ScenarioInputDetails = ScenarioInput & { body: string };

export const PostForm = (props: Props) => {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ScenarioInput>({
    defaultValues: props.defaultValues,
    resolver: zodResolver(updateScenarioInputSchema),
  });
  return (
    <form
      aria-label={props.title}
      className={styles.module}
      onSubmit={() => {}}
    >
      <div className={styles.content}>
        <div className={styles.meta}>
          <ScenarioFormInfo
            register={register}
            control={control}
            errors={errors}
          />
          {/* <PostFormHeroImage
            register={register}
            setValue={setValue}
            name="imageUrl"
            defaultImageUrl={props.defaultValues?.imageUrl}
            error={errors.imageUrl?.message}
          /> */}
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
        onClickDelete={props.onClickDelete}
      />
      {props.children}
    </form>
  );
};
