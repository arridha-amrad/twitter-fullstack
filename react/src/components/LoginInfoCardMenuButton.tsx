import { FC, HTMLAttributes } from "react";

const LoginInfoCardMenu: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <div
      {...props}
      className="flex items-center justify-center w-full px-4 py-3 overflow-hidden bg-transparent cursor-pointer gap-3 hover:dark:bg-slate-700 hover:bg-slate-300"
    >
      {props.children}
    </div>
  );
};

export default LoginInfoCardMenu;
