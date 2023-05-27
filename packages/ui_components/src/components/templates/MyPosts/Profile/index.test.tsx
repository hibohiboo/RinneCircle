import { getMyProfileData } from "@/services/server/MyProfile/__mock__/fixture";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Profile } from "./";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

const user = userEvent.setup();

const setup = () => {
  const router = createMemoryRouter(
    [
      {
        path: "/my/profile",
        element: <Profile {...getMyProfileData} />,
      },
      { path: "/my/profile/edit", element: <></> },
    ],
    { initialEntries: ["/my/profile"] },
  );
  render(<RouterProvider router={router} />);
  return { router };
};

test("アクセシブルネーム「プロフィール」で識別できる", () => {
  setup();
  expect(
    screen.getByRole("region", { name: "プロフィール" }),
  ).toBeInTheDocument();
});

test("「変更する」リンクを押下すると画面遷移する", async () => {
  const { router } = setup();
  await user.click(screen.getByRole("link", { name: "変更する" }));
  await waitFor(() => {
    expect(router.state.location.pathname).toBe(`/my/profile/edit`);
  });
});
