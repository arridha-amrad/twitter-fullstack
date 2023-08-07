import Sidebar from "../components/Sidebar/Sidebar";
import LayoutCenter from "./LayoutCenter";
import { Outlet } from "react-router-dom";
import LayoutRight from "./LayoutRight";
import SearchInput from "../components/SearchInput";
import MyToast from "../components/MyToast";
import Container from "../components/Container";

const Layout = () => {
  return (
    <Container>
      <MyToast />
      <Sidebar />
      <LayoutCenter>
        <Outlet />
      </LayoutCenter>
      <LayoutRight>
        <SearchInput />
      </LayoutRight>
    </Container>
  );
};

export default Layout;
