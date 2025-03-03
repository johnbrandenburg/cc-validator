import { describe, expect, test } from "vitest";
import CreditCard from "./CreditCard";

describe("Credit Card Schema", () => {
  test("returns success when valid", () => {
    const input = { cardNumber: "0" };
    const { success, data } = CreditCard.safeParse(input);
    expect(success).toBeTruthy();
    expect(JSON.stringify(data)).toMatch(JSON.stringify(input));
  });

  test("returns error when too short", () => {
    const input = { cardNumber: "" };
    const { success, error } = CreditCard.safeParse(input);
    expect(success).toBeFalsy();
    expect(JSON.stringify(error)).toMatch("too_small");
  });

  test("returns error when not a number", () => {
    const input = { cardNumber: "a2b" };
    const { success, error } = CreditCard.safeParse(input);
    expect(success).toBeFalsy();
    expect(JSON.stringify(error)).toMatch("not a number");
  });

  test("returns error when not valid", () => {
    const input = { cardNumber: "1" };
    const { success, error } = CreditCard.safeParse(input);
    expect(success).toBeFalsy();
    expect(JSON.stringify(error)).toMatch("invalid card number");
  });
});
