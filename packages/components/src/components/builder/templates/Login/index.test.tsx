import { composeStories } from "@storybook/react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as stories from "./index.stories";
import { Input } from ".";

const { Default } = composeStories(stories);
const user = userEvent.setup();

export async function setup(injectValues?: Partial<Input>) {
  render(<Default />);
  const input: Input = {
    email: "test@example.com",
    password: "abcd1234",
    ...injectValues,
  };
  const email = screen.getByRole("textbox", { name: "メールアドレス" });
  const password = screen.getByPlaceholderText("8文字以上で入力");
  const button = screen.getByRole("button", { name: "ログイン" });
  await user.type(email, input.email);
  await user.type(password, input.password);
  await user.click(button);
}

test("バリデーションエラーの場合、エラーメッセージが表示される", async () => {
  await setup({ email: "test", password: "1234" });
  const email = screen.getByRole("textbox", { name: "メールアドレス" });
  const password = screen.getByPlaceholderText("8文字以上で入力");
  await waitFor(() =>
    expect(email).toHaveErrorMessage("不正なメールアドレス形式です"),
  );
  expect(password).toHaveErrorMessage("8文字以上で入力してください");
});
