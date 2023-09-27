'use client';

import { ReactNode } from 'react';
import useMeasure from 'react-use-measure';
import SearchInput from '../../components/input/SearchInput';

function RightBar({ children }: { children: ReactNode }) {
  const [ref, { height }] = useMeasure();

  return (
    <div
      ref={ref}
      style={{ top: -height }}
      className="sticky hidden h-full min-h-screen w-full max-w-[390px] pl-6 pr-2 lg:block"
    >
      <div className="sticky top-0">
        <SearchInput />
      </div>
      {children}
    </div>
  );
}

export default RightBar;
