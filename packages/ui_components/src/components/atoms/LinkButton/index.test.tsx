import { render, screen } from "@testing-library/react";
import { LinkButton } from ".";
import { BrowserRouter } from "react-router-dom";

test("[role='link']", () => {
  render(<LinkButton to="#">test</LinkButton>, { wrapper: BrowserRouter });
  expect(screen.getByRole("link")).toBeInTheDocument();
});

test("[role='button'][aria-disabled='true']", () => {
  render(
    <LinkButton to="#" disabled>
      test
    </LinkButton>,
    { wrapper: BrowserRouter },
  );
  expect(screen.getByRole("link")).toHaveAttribute("aria-disabled", "true");
});
