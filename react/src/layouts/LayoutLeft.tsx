import { FC, ReactNode } from "react";

const LayoutLeft: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="sticky top-0 bottom-0 w-full py-3 h-screen xl:flex-shrink-[3] xl:max-w-[275px] max-w-[80px] flex-shrink-0 align-self: stretch">
      <div className="flex flex-col items-start h-full px-3 gap-4">
        {children}
      </div>
    </div>
  );
};

export default LayoutLeft;
