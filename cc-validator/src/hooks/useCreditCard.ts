import * as React from "react";
import { useMutation } from "@tanstack/react-query";

export default function useCreditCard(delay: number) {
  const [pending, setPending] = React.useState(false);
  const [validCardNumber, setValidCardNumber] = React.useState(true);
  const [cardNumber, setCardNumber] = React.useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: (cardNumber: string) => {
      return fetch("http://localhost:3000/api/credit_cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cardNumber }),
      });
    },
    onSuccess(data) {
      setValidCardNumber(data.ok);
    },
  });

  React.useEffect(() => {
    setPending(true);
    const handler = setTimeout(() => {
      mutate(cardNumber);
      setPending(isPending || false);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [cardNumber]);

  return {
    cardNumber,
    setCardNumber,
    validCardNumber,
    pending,
  };
}
