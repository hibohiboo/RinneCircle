import { getPostsData } from "@/services/server/Posts/__mock__/fixture";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// import mockRouter from "next-router-mock";
import { PostItem } from "./";
import { MemoryRouter } from "react-router-dom";

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

// test("リンクを押下すると画面遷移する", async () => {
//   const { post, click } = setup();
//   await click();
//   expect(mockRouter).toMatchObject({ pathname: `/posts/${post.id}` });
// });
