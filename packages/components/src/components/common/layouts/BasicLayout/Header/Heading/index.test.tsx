import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Heading } from "./";

test("[role=heading]", async () => {
  render(<Heading />, { wrapper: MemoryRouter });
  expect(
    screen.getByRole("heading", { name: "Rinne Circle" }),
  ).toBeInTheDocument();
});

// const user = userEvent.setup();

// const LocationDisplay = () => {
//   const location = useLocation();

//   return <div data-testid="location-display">{location.pathname}</div>;
// };
// const regTopPath = new RegExp("^/$");
// test("クリックするとTOPへ遷移する", async () => {
//   render(
//     <MemoryRouter initialEntries={["/posts?page=1"]}>
//       <Heading />
//       <LocationDisplay />
//     </MemoryRouter>,
//   );
//   await user.click(screen.getByRole("link"));
//   expect(screen.getByTestId("location-display")).toHaveTextContent(regTopPath);
// });
