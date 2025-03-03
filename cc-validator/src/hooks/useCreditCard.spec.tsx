import { describe, test, expect, beforeAll, afterEach, afterAll } from "vitest";
import React from "react";
import { renderHook, waitFor, act, cleanup } from "@testing-library/react";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useCreditCard from "./useCreditCard";

type CreditCardsRequestBody = { cardNumber: string };

const handlers = [
  http.post<{}, CreditCardsRequestBody>(
    "http://localhost:3000/api/credit_cards",
    async ({ request }) => {
      const { cardNumber } = await request.json();
      if (cardNumber !== "valid") {
        return new HttpResponse(null, { status: 422 });
      }
      return new HttpResponse(null, { status: 201 });
    },
  ),
];

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

afterEach(() => cleanup());

describe("useCreditCard", () => {
  test("should initialize with default values", async () => {
    const { result } = renderHook(() => useCreditCard(), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.cardNumber).toBe("");
      expect(result.current.validCardNumber).toBe(true);
      expect(result.current.pending).toBe(false);
    });
  });

  test("should update card number when setCardNumber is called", async () => {
    const { result } = renderHook(() => useCreditCard(), {
      wrapper,
    });

    act(() => {
      result.current.setCardNumber("42");
    });

    expect(result.current.cardNumber).toBe("42");
  });

  test("should set pending while validating", async () => {
    const { result } = renderHook(() => useCreditCard(), {
      wrapper,
    });

    act(() => {
      result.current.setCardNumber("valid");
    });

    expect(result.current.pending).toBe(true);

    await waitFor(() => {
      expect(result.current.pending).toBe(false);
    });
  });

  test("should validate card after delay", async () => {
    const { result } = renderHook(() => useCreditCard(), {
      wrapper,
    });

    act(() => {
      result.current.setCardNumber("valid");
    });

    await waitFor(() => {
      expect(result.current.validCardNumber).toBe(true);
    });
  });

  test("should invalidate invalid card number after delay", async () => {
    const { result } = renderHook(() => useCreditCard(), {
      wrapper,
    });

    act(() => {
      result.current.setCardNumber("not valid");
    });

    expect(result.current.pending).toBe(true);

    await waitFor(() => {
      expect(result.current.pending).toBe(false);
      expect(result.current.validCardNumber).toBe(false);
    });
  });

  test("should handle server error", async () => {
    const handlers = [
      http.post("http://localhost:3000/api/credit_cards", () => {
        return new HttpResponse(null, { status: 500 });
      }),
    ];

    const { result } = renderHook(() => useCreditCard(), {
      wrapper,
    });

    act(() => {
      result.current.setCardNumber("valid");
    });

    await waitFor(() => {
      expect(result.current.validCardNumber).toBe(false);
      expect(result.current.pending).toBe(false);
    });
  });
});
