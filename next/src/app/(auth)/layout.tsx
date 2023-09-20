import { FC, ReactNode } from "react";
import Sidebar from "../components/Sidebar/Sidebar";

import LayoutRight from "./layoutRight";

type Props = {
  children: ReactNode;
  rightBar: ReactNode;
};

const Layout: FC<Props> = ({ children, rightBar }) => {
  return (
    <div className="xl:max-w-[1265px] lg:max-w-[1090px] md:max-w-[700px] mx-auto">
      <div className="flex">
        <Sidebar />
        <div className="max-w-[598px] w-full border-skin-base border-x overflow-x-clip">
          {children}
        </div>
        <LayoutRight>{rightBar}</LayoutRight>
      </div>
    </div>
  );
};

export default Layout;
