import * as React from "react";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { Spin } from "antd";

export default function ValidIcon(validCardNumber: boolean, pending: boolean) {
  if (pending) {
    return <Spin size="default" />;
  }

  if (!validCardNumber) {
    return (
      <CloseCircleTwoTone style={{ fontSize: "24px" }} twoToneColor="#eb2f96" />
    );
  }

  return (
    <CheckCircleTwoTone style={{ fontSize: "24px" }} twoToneColor="#52c41a" />
  );
}
