import { http, HttpResponse } from "msw";

type CreditCardsRequestBody = { cardNumber: string };

export const handlers = [
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
