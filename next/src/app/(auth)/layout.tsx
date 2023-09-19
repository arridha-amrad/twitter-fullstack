import { FC, ReactNode } from "react";
import Sidebar from "./components/Sidebar/Sidebar";

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="container mx-auto min-h-screen">
      <div className="flex">
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
