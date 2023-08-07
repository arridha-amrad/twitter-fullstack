import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function ModalContainer({ children }: Props) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 max-w-[600px] dark:bg-black bg-white rounded-xl my-10 h-max max-h-screen overflow-hidden w-[90vw]">
      {children}
    </div>
  );
}
