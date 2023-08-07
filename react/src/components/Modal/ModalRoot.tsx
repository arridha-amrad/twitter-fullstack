import { Dispatch, ReactNode, SetStateAction, useEffect } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  open: boolean;
  children: ReactNode;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function ModalRoot({ open, children, setOpen }: Props) {
  const html = document.documentElement;

  useEffect(() => {
    if (open) {
      html.classList.add('overflow-hidden', 'mr-4');
    } else {
      html.classList.remove('overflow-hidden', 'mr-4');
    }
  }, [open]);

  return createPortal(
    <>
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="fixed inset-0 z-50"
        >
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-slate-600/60"
          />
          {children}
        </div>
      )}
    </>,
    document.body
  );
}
