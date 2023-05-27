import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NoItems } from "./";
import {
  MemoryRouter,
  RouterProvider,
  createMemoryRouter,
} from "react-router-dom";

const user = userEvent.setup();

test("タイトル表示", async () => {
  render(
    <MemoryRouter>
      <NoItems />
    </MemoryRouter>,
  );
  expect(
    screen.getByRole("heading", { name: "投稿記事がありません" }),
  ).toBeInTheDocument();
});

test("リンク押下", async () => {
  const router = createMemoryRouter(
    [
      { path: "/my/posts", element: <NoItems /> },
      { path: "/my/posts/create", element: <></> },
    ],
    { initialEntries: ["/my/posts"] },
  );
  render(<RouterProvider router={router} />);

  await user.click(
    screen.getByRole("link", {
      name: "はじめての記事を書いてみましょう",
    }),
  );
  expect(router.state.location.pathname).toBe("/my/posts/create");
});
