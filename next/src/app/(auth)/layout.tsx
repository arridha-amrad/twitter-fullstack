import Link from "next/link";
import { FC, ReactNode } from "react";
import Sidebar from "./components/Sidebar/Sidebar";

type Props = {
  children: ReactNode;
};

const loginUser = {
  fullname: "Arridha Amrad",
  username: "arridhaamrad",
};

const links = [
  {
    title: "Home",
    url: "/home",
  },
  {
    title: "Profile",
    url: `/${loginUser.username}`,
  },
  {
    title: "Notifications",
    url: "/notifications",
  },
];

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
