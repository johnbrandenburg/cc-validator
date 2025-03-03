import { describe, test, expect, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import ValidIcon from "./valid-icon";

afterEach(() => cleanup());

describe("ValidIcon", () => {
  test("should render nothing when card number is empty", () => {
    const { container } = render(ValidIcon(false, "", false));
    expect(container).toBeEmptyDOMElement();
  });

  test("should render spinner when pending is true", () => {
    const { container, queryByTestId } = render(
      ValidIcon(false, "4242424242424242", true),
    );
    expect(container.querySelector(".ant-spin-spinning")).toBeTruthy();
    expect(queryByTestId("close-circle")).toBeFalsy();
    expect(queryByTestId("check-circle")).toBeFalsy();
  });

  test("should render red X icon when card number is invalid", () => {
    const { queryByTestId } = render(
      ValidIcon(false, "4242424242424242", false),
    );
    expect(queryByTestId("close-circle")).toBeTruthy();
  });

  test("should render green check icon when card number is valid", () => {
    const { queryByTestId } = render(
      ValidIcon(true, "4242424242424242", false),
    );
    expect(queryByTestId("check-circle")).toBeTruthy();
  });
});
