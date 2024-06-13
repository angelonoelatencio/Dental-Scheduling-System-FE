import { notification as antdNotification } from "antd";
import { ReactNode } from "react";

const showNotification = (
  type: "success" | "info" | "warning" | "error",
  message: string,
  description: string,
  onClick?: () => void,
  key?: string,
  duration?: number,
  footerBtn?: ReactNode
) => {
  antdNotification[type]({
    message,
    description,
    placement: "bottomRight", // Change the placement as needed
    key,
    onClick: onClick,
    duration: duration ?? 3,
    btn: footerBtn,
  });
};

export default showNotification;
