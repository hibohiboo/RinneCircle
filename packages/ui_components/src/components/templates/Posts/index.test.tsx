import { getPostsData } from "@/services/server/Posts/__mock__/fixture";
import { render, screen } from "@testing-library/react";
import { Posts } from "./";
import { MemoryRouter } from "react-router-dom";

test("見出しの表示", async () => {
  render(
    <MemoryRouter>
      <Posts {...getPostsData} />
    </MemoryRouter>,
  );
  expect(
    screen.getByRole("heading", { name: "最新投稿一覧" }),
  ).toBeInTheDocument();
});

test("主要コンテンツの表示", async () => {
  render(
    <MemoryRouter>
      <Posts {...getPostsData} />
    </MemoryRouter>,
  );
  expect(screen.getByRole("region", { name: "記事一覧" })).toBeInTheDocument();
  expect(
    screen.getByRole("navigation", { name: "ページネーション" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("region", { name: "現在表示中の一覧概要" }),
  ).toBeInTheDocument();
});
