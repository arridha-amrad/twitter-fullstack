import { FC, ImgHTMLAttributes } from "react";

const Logo: FC<
  { size: "small" | "normal" } & ImgHTMLAttributes<HTMLImageElement>
> = ({ size }) => {
  const ratio = size === "normal" ? "h-10 w-10" : "h-8 w-8";
  return (
    <div className="flex justify-start w-full pl-2">
      <div className={`${ratio}`}>
        <img
          className={`w-full h-full dark:block hidden`}
          src={`${import.meta.env.VITE_CLIENT_BASE_URL}/logo-white.svg`}
        />
        <img
          className={`w-full h-full block dark:hidden`}
          src={`${import.meta.env.VITE_CLIENT_BASE_URL}/logo-light.svg`}
        />
      </div>
    </div>
  );
};

export default Logo;
