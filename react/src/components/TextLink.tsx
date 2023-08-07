import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";

interface IProps {
  to: string;
  children: ReactNode;
}

const TextLink: FC<IProps> = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="text-xs text-blue-500 no-underline dark:text-blue-600 sm:text-sm"
    >
      {children}
    </Link>
  );
};

export default TextLink;
