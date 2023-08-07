import { ReactNode } from "react";
import MyToast from "./MyToast";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="xl:max-w-[1265px] lg:max-w-[1090px] md:max-w-[700px] mx-auto">
      <MyToast />
      <div className="flex">{children}</div>
    </div>
  );
};

export default Container;
