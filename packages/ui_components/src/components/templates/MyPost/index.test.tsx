import { getMyPostData } from "@/services/server/MyPost/__mock__/fixture";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { MyPost } from "./";
import {
  MemoryRouter,
  RouterProvider,
  createMemoryRouter,
} from "react-router-dom";

const user = userEvent.setup();

test("見出しの表示", async () => {
  render(
    <MemoryRouter>
      <MyPost post={getMyPostData} />
    </MemoryRouter>,
  );
  expect(
    screen.getByRole("heading", { name: "Frontend Testing Example" }),
  ).toBeInTheDocument();
});

test("「編集する」リンクを押下すると、編集ページに遷移する", async () => {
  const router = createMemoryRouter(
    [
      { path: "/my/posts/:id/", element: <MyPost post={getMyPostData} /> },
      { path: "/my/posts/:id/edit", element: <></> },
    ],
    { initialEntries: ["/my/posts/1/"] },
  );
  render(<RouterProvider router={router} />);
  await user.click(screen.getByRole("link", { name: "編集する" }));
  await waitFor(() =>
    expect(router.state.location.pathname).toBe(`/my/posts/1/edit`),
  );
});
