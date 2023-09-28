'use client';

import SearchInput from '@/components/input/SearchInput';
import { ReactNode } from 'react';
import useMeasure from 'react-use-measure';

function RightBarContainer({ children }: { children: ReactNode }) {
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

export default RightBarContainer;
