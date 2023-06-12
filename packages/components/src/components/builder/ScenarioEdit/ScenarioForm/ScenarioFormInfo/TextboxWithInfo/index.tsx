import clsx from "clsx";
import { ComponentProps, forwardRef, ReactNode, useId } from "react";
import styles from "./styles.module.css";
import { Textbox } from "@/components/common/atoms/Textbox";
import { DescriptionMessage } from "@/components/common/atoms/DescriptionMessage";
import { ErrorMessage } from "@/components/common/atoms/ErrorMessage";

type Props = ComponentProps<typeof Textbox> & {
  title: string;
  info?: ReactNode;
  description?: string;
  error?: string;
};

export const TextboxWithInfo = forwardRef<HTMLInputElement, Props>(
  function TextboxWithInfo(
    { title, info, description, error, className, ...props },
    ref,
  ) {
    const componentId = useId();
    const textboxId = `${componentId}-textbox`;
    const descriptionId = `${componentId}-description`;
    const errorMessageId = `${componentId}-errorMessage`;
    return (
      <section className={clsx(styles.module, className)}>
        <header className={styles.header}>
          <label className={styles.label} htmlFor={textboxId}>
            {title}
          </label>
          {info}
        </header>
        <Textbox
          {...props}
          ref={ref}
          id={textboxId}
          aria-invalid={!!error}
          aria-errormessage={errorMessageId}
          aria-describedby={description ? descriptionId : undefined}
        />
        {(error || description) && (
          <footer className={styles.footer}>
            {description && (
              <DescriptionMessage id={descriptionId}>
                {description}
              </DescriptionMessage>
            )}
            {error && (
              <ErrorMessage id={errorMessageId} className={styles.error}>
                {error}
              </ErrorMessage>
            )}
          </footer>
        )}
      </section>
    );
  },
);
