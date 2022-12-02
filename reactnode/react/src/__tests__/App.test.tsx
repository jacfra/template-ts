import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders learn react link", () => {
  render(<App />);
  const _a = "";
  _a + "p";
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
