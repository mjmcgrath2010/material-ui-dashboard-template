import { render, screen } from "@testing-library/react";
import App from "../App";

xtest("renders learn react link", () => {
  render(<App />);
  const name = screen.getByText(/Promptli/i);
  expect(name).toBeInTheDocument();
});
