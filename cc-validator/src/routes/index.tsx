import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Input } from "antd";
import { ValidIcon } from "../components";
import { useCreditCard } from "../hooks";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const [inputStatus, setInputStatus] = React.useState<"" | "error">("");
  const { cardNumber, setCardNumber, validCardNumber, pending } =
    useCreditCard(300);

  React.useEffect(() => {
    if (pending || cardNumber.length < 1) {
      setInputStatus("");
    } else {
      const status = validCardNumber ? "" : "error";
      setInputStatus(status);
    }
  }, [validCardNumber, cardNumber, pending]);

  return (
    <div className="max-w-sm mx-auto mt-8 bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">
      <h3 className="text-gray-900 dark:text-white mb-2 text-base font-medium tracking-tight ">
        Credit Card Validator
      </h3>
      <Input
        size="large"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
        suffix={ValidIcon(validCardNumber, cardNumber, pending)}
        status={inputStatus}
        placeholder="Enter CC #"
      ></Input>
    </div>
  );
}

export default HomeComponent;
