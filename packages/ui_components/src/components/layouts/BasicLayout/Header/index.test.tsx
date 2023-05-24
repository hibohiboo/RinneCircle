import { handleGetMyProfile } from "@/services/client/MyProfile/__mock__/msw";
import { setupMockServer } from "@/tests/jest";
import { composeStories } from "@storybook/react";
import { render, screen, waitFor } from "@testing-library/react";
import * as stories from "./index.stories";

const { NotLoggedIn } = composeStories(stories);
const server = setupMockServer();

test("[role=banner]", async () => {
  server.use(handleGetMyProfile({ status: 401 }));
  render(<NotLoggedIn />);
  await waitFor(() => {
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });
});

test("未ログインの場合、ログインボタンが表示される", async () => {
  server.use(handleGetMyProfile({ status: 401 }));
  render(<NotLoggedIn />);
  expect(
    screen.getByRole("heading", { name: "Tech Posts" }),
  ).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.getByRole("link", { name: "ログイン" })).toBeInTheDocument();
  });
});
