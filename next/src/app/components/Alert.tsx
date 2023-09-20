import { FC, ReactNode } from "react";

export type TAlert = {
  type: "success" | "danger";
  message: string;
};

interface IProps {
  children: ReactNode;
  type: "success" | "danger";
}

const Alert: FC<IProps> = ({ children, type }) => {
  const alertType =
    type === "danger"
      ? "bg-red-100 text-red-700 dark:text-red-200 dark:bg-red-700"
      : "bg-green-100 text-green-700 dark:text-green-200 dark:bg-green-700";
  return (
    <div className={`rounded-lg p-4 text-sm ${alertType}`}>
      <p>{children}</p>
    </div>
  );
};

export default Alert;
