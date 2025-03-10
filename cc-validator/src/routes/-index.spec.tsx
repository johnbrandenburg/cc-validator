import { describe, test, expect, beforeAll, afterEach, afterAll } from "vitest";
import React from "react";
import {
  render,
  waitFor,
  act,
  fireEvent,
  cleanup,
} from "@testing-library/react";
import { server } from "../mocks/node";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomeComponent from ".";

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrappedHomeComponent = () => (
  <QueryClientProvider client={queryClient}>
    <HomeComponent />
  </QueryClientProvider>
);

afterEach(() => cleanup());

describe("HomeComponent", () => {
  test("should initialize with default values", () => {
    const { getByText, getByPlaceholderText } = render(wrappedHomeComponent());
    expect(getByText("Credit Card Validator")).toBeTruthy();
    const input = getByPlaceholderText("Enter CC #");

    expect(input.nextSibling?.firstChild).toBeFalsy();
  });

  test("should show spinner then valid check", async () => {
    const { container, queryByTestId, getByPlaceholderText } = render(
      wrappedHomeComponent(),
    );
    const input = getByPlaceholderText("Enter CC #");
    fireEvent.change(input, { target: { value: "valid" } });

    expect(container.querySelector(".ant-spin-spinning")).toBeTruthy();
    expect(queryByTestId("close-circle")).toBeFalsy();
    await waitFor(() => {
      expect(queryByTestId("check-circle")).toBeTruthy();
    });
  });

  test("should show spinner then error icon", async () => {
    const { container, queryByTestId, getByPlaceholderText } = render(
      wrappedHomeComponent(),
    );
    const input = getByPlaceholderText("Enter CC #");
    fireEvent.change(input, { target: { value: "invalid" } });

    expect(container.querySelector(".ant-spin-spinning")).toBeTruthy();
    expect(queryByTestId("check-circle")).toBeFalsy();
    await waitFor(() => {
      expect(queryByTestId("close-circle")).toBeTruthy();
    });
  });
});
