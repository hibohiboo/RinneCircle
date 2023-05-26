import { getPostData } from "@/services/server/Post/__mock__/fixture";
import { render, screen } from "@testing-library/react";
import { Post } from "./";
import { MemoryRouter } from "react-router-dom";

test("見出しの表示", async () => {
  render(
    <MemoryRouter>
      <Post post={getPostData} user={null} />
    </MemoryRouter>,
  );
  expect(
    screen.getByRole("heading", { name: "Frontend Testing Example" }),
  ).toBeInTheDocument();
});

test("「Like」ボタンの表示", async () => {
  render(
    <MemoryRouter>
      <Post post={getPostData} user={null} />
    </MemoryRouter>,
  );
  expect(screen.getByRole("button", { name: "Like" })).toBeInTheDocument();
});
