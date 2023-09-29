import { FC, ReactNode } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';

type Props = {
  children: ReactNode;
  modal: ReactNode;
};

const Layout: FC<Props> = ({ children, modal }) => {
  return (
    <div id='main-layout' className="mx-auto md:max-w-[700px] lg:max-w-[1090px] xl:max-w-[1265px]">
      <div className="flex">
        <Sidebar />
        {modal}
        {children}
      </div>
    </div>
  );
};

export default Layout;
