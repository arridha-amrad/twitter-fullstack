import { ButtonHTMLAttributes, FC, ReactNode } from 'react';

export type TBtnStatus = 'ok' | 'loading' | 'not-allowed';

interface IProps {
  children: ReactNode;
  size: 'small' | 'normal';
  variant:
    | 'fill-primary'
    | 'fill-danger'
    | 'outlined-primary'
    | 'outlined-danger';
}

const Button: FC<IProps & ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  size,
  variant,
  ...props
}) => {
  const btnSize = size === 'small' ? 'px-5 py-1 text-sm' : 'px-5 py-2.5';
  const btnVariant =
    variant === 'fill-primary'
      ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800 disabled:bg-blue-400 disabled:dark:bg-blue-900'
      : variant === 'fill-danger'
      ? 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-300  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 disabled:bg-red-400'
      : variant === 'outlined-primary'
      ? 'border border-gray-300 dark:border-gray-600 text-blue-500 hover:border-blue-300 hover:bg-blue-200 focus:ring-blue-300'
      : 'border border-red-300 text-red-500 hover:border-red-300 hover:bg-red-200 focus:ring-red-300';
  return (
    <button
      {...props}
      className={`cursor-pointer rounded-lg text-sm font-medium outline-none transition duration-200 ease-in focus:ring-4 md:text-base ${btnSize} ${btnVariant}`}
    >
      {children}
    </button>
  );
};

export default Button;
