import { ReactNode } from 'react';
import Counter from './Counter';

export default function Template({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="bg-red-500 p-5">
        <h1>This is the template</h1>
        <Counter />
      </div>
      {children}
    </>
  );
}
