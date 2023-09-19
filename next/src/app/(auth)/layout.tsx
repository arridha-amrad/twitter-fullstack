import { FC, ReactNode } from "react";
import Sidebar from "./components/Sidebar/Sidebar";

type Props = {
  children: ReactNode;
  modal: ReactNode;
};

const Layout: FC<Props> = ({ children, modal }) => {
  return (
    <div className="container mx-auto min-h-screen">
      <div className="flex">
        <Sidebar />
        {children}
        {modal}
      </div>
    </div>
  );
};

export default Layout;
