import { FC, ReactNode } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';

import LayoutRight from './layoutRight';

type Props = {
  children: ReactNode;
  rightBar: ReactNode;
};

const Layout: FC<Props> = ({ children, rightBar }) => {
  return (
    <div className="mx-auto md:max-w-[700px] lg:max-w-[1090px] xl:max-w-[1265px]">
      <div className="flex">
        <Sidebar />
        <div className="w-full max-w-[598px] overflow-x-clip border-x border-skin-base">
          {children}
        </div>
        <LayoutRight>{rightBar}</LayoutRight>
      </div>
    </div>
  );
};

export default Layout;
