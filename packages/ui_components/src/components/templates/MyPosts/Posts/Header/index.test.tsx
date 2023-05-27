import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "./";
import {
  MemoryRouter,
  RouterProvider,
  createMemoryRouter,
} from "react-router-dom";

const user = userEvent.setup();

function setup(url = "/my/posts?page=1") {
  render(
    <MemoryRouter initialEntries={[url]}>
      <Header />
    </MemoryRouter>,
  );
  const combobox = screen.getByRole("combobox", { name: "公開ステータス" });
  async function selectOption(label: string) {
    await user.selectOptions(combobox, label);
  }
  return { combobox, selectOption };
}

test("デフォルトでは「すべて」が選択されている", async () => {
  const { combobox } = setup();
  expect(combobox).toHaveDisplayValue("すべて");
});

test("status?=public のアクセス場合「公開」が選択されている", async () => {
  const { combobox } = setup("/my/posts?status=public");
  expect(combobox).toHaveDisplayValue("公開");
});

test("staus?=private のアクセス場合「下書き」が選択されている", async () => {
  const { combobox } = setup("/my/posts?status=private");
  expect(combobox).toHaveDisplayValue("下書き");
});

test("公開ステータスを変更すると、status が変わる", async () => {
  // すでにある page=1 が消えていないこともあわせて検証
  const router = createMemoryRouter(
    [{ path: "/my/posts", element: <Header /> }],
    { initialEntries: ["/my/posts?page=1&status=public"] },
  );
  render(<RouterProvider router={router} />);
  const combobox = screen.getByRole("combobox", { name: "公開ステータス" });
  async function selectOption(label: string) {
    await user.selectOptions(combobox, label);
  }
  await waitFor(() => {
    selectOption("公開");
    expect(router.state.location.pathname).toBe(`/my/posts`);
    expect(router.state.location.search).toBe(`?page=1&status=public`);
  });
  await selectOption("下書き");
  await waitFor(() => {
    expect(router.state.location.pathname).toBe(`/my/posts`);
    expect(router.state.location.search).toBe(`?page=1&status=private`);
  });
});
