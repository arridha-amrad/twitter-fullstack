import { FC, ReactNode } from 'react';
import useMeasure from 'react-use-measure';

const LayoutRight: FC<{ children: ReactNode }> = ({ children }) => {
  const [ref, { height }] = useMeasure();

  return (
    <div
      ref={ref}
      style={{ top: window.innerHeight - height }}
      className="sticky hidden h-full min-h-screen w-full max-w-[390px] pl-6 pr-2 lg:block"
    >
      {children}
    </div>
  );
};

export default LayoutRight;
