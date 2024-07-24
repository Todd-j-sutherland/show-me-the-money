import React from "react";
import { render, screen } from "@testing-library/react";
import LoadingSpinner from "../Loading.Spinner";

describe("LoadingSpinner Component", () => {
  test("renders the loading spinner", () => {
    render(<LoadingSpinner />);

    const spinnerContainer = screen.getByTestId("loading-spinner");
    const spinner = screen.getByTestId("spinner");

    expect(spinnerContainer).toBeInTheDocument();
    expect(spinner).toBeInTheDocument();
  });
});
