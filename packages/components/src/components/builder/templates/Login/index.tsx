import { Button } from "@/components/common/atoms/Button";
import { TextboxWithError } from "@/components/common/molecules/TextboxWithError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import styles from "./styles.module.css";
import * as z from "zod";

const InputSchema = z.object({
  email: z.string().email("不正なメールアドレス形式です"),
  password: z.string().min(8, "8文字以上で入力してください"),
});

export type Input = z.infer<typeof InputSchema>;

const defaultValues: Input = {
  email: "",
  password: "",
};

export const Login: React.FC<{
  onSubmit: (values: Input) => Promise<void>;
}> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(InputSchema),
  });
  return (
    <form className={styles.module} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.image}></div>
      <div className={styles.inputs}>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>ログイン</legend>
          <div className={styles.email}>
            <label htmlFor="email">メールアドレス</label>
            <TextboxWithError
              {...register("email")}
              id="email"
              type="text"
              placeholder="example@test.com"
              error={errors.email?.message}
            />
          </div>
          <div className={styles.password}>
            <label htmlFor="password">パスワード</label>
            <TextboxWithError
              {...register("password")}
              id="password"
              type="password"
              placeholder="8文字以上で入力"
              error={errors.password?.message}
            />
          </div>
        </fieldset>
        <Button variant="large" className={styles.button}>
          ログイン
        </Button>
      </div>
    </form>
  );
};
