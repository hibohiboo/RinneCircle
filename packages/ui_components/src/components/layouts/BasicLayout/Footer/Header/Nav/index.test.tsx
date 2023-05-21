import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Nav } from "./";

test("「My Posts」がカレント状態になっている", () => {
  render(
    <MemoryRouter initialEntries={["/my/posts"]}>
      <Nav onCloseMenu={() => {}} />
    </MemoryRouter>,
  );
  const link = screen.getByRole("link", { name: "My Posts" });
  expect(link).toHaveAttribute("aria-current", "page");
});

test("「Create Post」がカレント状態になっている", () => {
  render(
    <MemoryRouter initialEntries={["/my/posts/create"]}>
      <Nav onCloseMenu={() => {}} />
    </MemoryRouter>,
  );
  const link = screen.getByRole("link", { name: "Create Post" });
  expect(link).toHaveAttribute("aria-current", "page");
});

test.each([
  { url: "/my/posts", name: "My Posts" },
  { url: "/my/posts/123", name: "My Posts" },
  { url: "/my/posts/create", name: "Create Post" },
])("$url では $name がカレントになっている", ({ url, name }) => {
  render(
    <MemoryRouter initialEntries={[url]}>
      <Nav onCloseMenu={() => {}} />{" "}
    </MemoryRouter>,
  );
  const link = screen.getByRole("link", { name });
  expect(link).toHaveAttribute("aria-current", "page");
});
