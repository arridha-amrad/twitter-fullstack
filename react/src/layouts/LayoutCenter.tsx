import { FC, ReactNode } from "react";

const LayoutCenter: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="max-w-[598px] w-full border-l dark:border-slate-700 border-slate-200 border-r overflow-x-clip">
      {children}
    </div>
  );
};

export default LayoutCenter;
