import * as React from "react";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { Spin } from "antd";

export default function ValidIcon(
  validCardNumber: boolean,
  cardNumber: string,
  pending: boolean,
) {
  if (cardNumber.length < 1) {
    return <></>;
  }

  if (pending) {
    return <Spin size="default" />;
  }

  if (!validCardNumber) {
    return (
      <CloseCircleTwoTone
        data-testid="close-circle"
        style={{ fontSize: "24px" }}
        twoToneColor="#eb2f96"
      />
    );
  }

  return (
    <CheckCircleTwoTone
      data-testid="check-circle"
      style={{ fontSize: "24px" }}
      twoToneColor="#52c41a"
    />
  );
}
