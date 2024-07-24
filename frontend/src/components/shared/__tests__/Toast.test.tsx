import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Toast from "../Toast";

jest.useFakeTimers();

describe("Toast", () => {
  test("is not visible when isError is false", () => {
    render(<Toast isError={false} message="test message" />);
    expect(screen.queryByText("test message")).not.toBeInTheDocument();
  });

  test("displays correct message when isError is true", () => {
    render(<Toast isError={true} message="test error message" />);
    expect(screen.getByText("test error message")).toBeInTheDocument();
  });

  test("has error styling", () => {
    render(<Toast isError={true} message="test error message" type="error" />);
    expect(screen.getByText("test error message")).toHaveClass("bg-red-500");
  });

  test("disappears after duration", async () => {
    render(<Toast isError={true} message="test message" duration={2000} />);
    expect(screen.getByText("test message")).toBeInTheDocument();
    jest.runAllTimers();
    await waitFor(() => {
      expect(screen.queryByText("test message")).not.toBeInTheDocument();
    });
  });

  test("appears when isError becomes true", () => {
    const { rerender } = render(
      <Toast isError={false} message="Test message" />
    );
    expect(screen.queryByText("Test message")).not.toBeInTheDocument();
    rerender(<Toast isError={true} message="Test message" />);
    expect(screen.getByText("Test message")).toBeInTheDocument();
  });

  test("has correct visibility classes", () => {
    render(<Toast isError={true} message="Test message" />);
    const toastElement = screen.getByText("Test message");
    expect(toastElement).toHaveClass("opacity-100", "translate-y-0");
    expect(toastElement).not.toHaveClass("opacity-0", "translate-y-8");
  });
});
