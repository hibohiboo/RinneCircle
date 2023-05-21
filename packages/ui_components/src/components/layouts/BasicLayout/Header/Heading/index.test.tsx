import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useLocation } from "react-router-dom";
import { Heading } from "./";

const user = userEvent.setup();

test("[role=heading]", async () => {
  render(<Heading />);
  expect(
    screen.getByRole("heading", { name: "Tech Posts" }),
  ).toBeInTheDocument();
});
const LocationDisplay = () => {
  const location = useLocation();

  return <div data-testid="location-display">{location.pathname}</div>;
};
const regTopPath = new RegExp("^/$");
test("クリックするとTOPへ遷移する", async () => {
  render(
    <MemoryRouter initialEntries={["/posts?page=1"]}>
      <Heading />
      <LocationDisplay />
    </MemoryRouter>,
  );
  await user.click(screen.getByRole("link"));
  expect(screen.getByTestId("location-display")).toHaveTextContent(regTopPath);
});
