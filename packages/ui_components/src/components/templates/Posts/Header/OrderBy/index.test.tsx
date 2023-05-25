import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OrderBy } from "./";
import {
  MemoryRouter,
  RouterProvider,
  createMemoryRouter,
} from "react-router-dom";

const user = userEvent.setup();

function setup(asPath = "/posts") {
  render(
    <MemoryRouter initialEntries={[asPath]}>
      <OrderBy />
    </MemoryRouter>,
  );
  const combobox = screen.getByRole("combobox");
  return { combobox };
}

test("初期表示、query.orderBy なしの場合「公開日時順」が選択されている", async () => {
  const { combobox } = setup();
  expect(combobox).toHaveDisplayValue("更新日時順");
});

test("選択した場合、query.orderBy が設定される", async () => {
  const router = createMemoryRouter(
    [
      {
        path: "/posts",
        element: <OrderBy />,
      },
    ],
    { initialEntries: ["/posts"] },
  );
  render(<RouterProvider router={router} />);
  const combobox = screen.getByRole("combobox");
  await user.selectOptions(combobox, "starCount");
  expect(combobox).toHaveDisplayValue("スター数順");
  await waitFor(() => {
    expect(router.state.location.pathname).toBe(`/posts`);
    expect(router.state.location.search).toBe(`?orderBy=starCount`);
  });
});
