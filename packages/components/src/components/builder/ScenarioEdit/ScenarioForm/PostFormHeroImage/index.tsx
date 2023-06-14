import clsx from "clsx";
import { FieldValues, Path } from "react-hook-form";
import ImageIcon from "./assets/image.svg";
import styles from "./styles.module.css";
import { ScenarioInputSchema } from "@rinne-components/domain/scenario/schema";
import { InputFileButton } from "@rinne-components/components/common/atoms/InputFileButton";
import { ChangeEvent } from "react";

type Props<T extends FieldValues = ScenarioInputSchema> = {
  name: Path<T>;
  defaultImageUrl?: string | null;
  error?: string;
  onChangeImage: (event: ChangeEvent<HTMLInputElement>) => void;
  imageUrl?: string;
};

export const PostFormHeroImage = (props: Props) => {
  const { onChangeImage, imageUrl } = props;
  return (
    <div className={styles.module}>
      {imageUrl && <img src={imageUrl} alt="" />}
      <InputFileButton
        className={clsx(styles.button, imageUrl && styles.hasImage)}
        buttonProps={{
          theme: props.error ? "error" : "dark",
          children: (
            <>
              <img src={ImageIcon} />
              <br />
              {props.error ? (
                <span>{props.error}</span>
              ) : (
                <span>
                  {imageUrl ? "イメージを変更する" : "イメージを選択する"}
                </span>
              )}
            </>
          ),
          type: "button",
          variant: "small",
        }}
        inputProps={{
          "data-testid": "file",
          accept: "image/png, image/jpeg",
          onChange: onChangeImage,
        }}
      />
    </div>
  );
};
