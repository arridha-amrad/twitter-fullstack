import { ReactNode } from 'react';
import Container from '../components/Container';
import Sidebar from '../components/Sidebar/Sidebar';

const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Container>
      <Sidebar />
      {children}
    </Container>
  );
};

export default PageLayout;
