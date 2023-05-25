import { getPostsData } from "@/services/server/Posts/__mock__/fixture";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PostItem } from "./";
import {
  MemoryRouter,
  RouterProvider,
  createMemoryRouter,
} from "react-router-dom";

const user = userEvent.setup();

const setup = (published = true) => {
  const post = getPostsData.posts[0];
  render(
    <MemoryRouter>
      <PostItem post={{ ...post, published }} />
    </MemoryRouter>,
  );
  const link = screen.getByRole("link");
  const click = () => user.click(link);
  return { post, link, click };
};

test("リンクのアクセシブルネームはタイトルを参照する", async () => {
  const { post, link } = setup();
  expect(link).toHaveAccessibleName(post.title);
});

test("リンクを押下すると画面遷移する", async () => {
  const post = getPostsData.posts[0];

  const router = createMemoryRouter(
    [
      {
        path: "/posts",
        element: <PostItem post={{ ...post, published: true }} />,
      },
      {
        path: "/posts/1",
        element: <></>,
      },
    ],
    { initialEntries: ["/posts"] },
  );
  render(<RouterProvider router={router} />);
  const link = screen.getByRole("link");
  const click = () => user.click(link);
  await click();
  await waitFor(() => {
    expect(router.state.location.pathname).toBe(`/posts/${post.id}`);
  });
});
