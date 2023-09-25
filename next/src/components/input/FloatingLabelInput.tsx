import { FC, InputHTMLAttributes, useRef, useState } from 'react';
import EyeIcon from '@heroicons/react/24/outline/EyeIcon';
import EyeSlashIcon from '@heroicons/react/24/outline/EyeSlashIcon';

interface IProps {
  labelText: string;
  isPassword?: boolean;
}

const className = 'aspect-square w-6 stroke-gray-400 dark:stroke-gray-500';

const FloatingLabelInput: FC<
  IProps & InputHTMLAttributes<HTMLInputElement>
> = ({ labelText, isPassword = false, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        id={props.id}
        ref={inputRef}
        {...props}
        className={`
				peer w-full appearance-none rounded-xl border border-skin-base bg-transparent px-[16px] pb-2.5 pt-6 text-sm outline-none focus:border-transparent focus:ring-4 focus:ring-skin-base focus:ring-offset-0 text-skin-base md:text-base
				${isPassword && 'pr-16'}
				`}
        type={`${isPassword ? (show ? 'text' : 'password') : 'text'}`}
        placeholder=" "
      />
      <label
        htmlFor={props.id}
        onClick={() => inputRef.current?.focus()}
        className="absolute left-2 top-2 origin-[0] -translate-y-1 scale-75 cursor-text px-2 text-sm text-skin-accent transition-all duration-100 ease-in peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-1 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-skin-base md:text-base"
      >
        {labelText}
      </label>
      {isPassword && (
        <div className="absolute inset-y-0 right-0 overflow-hidden p-2">
          <button
            onClick={() => setShow((val) => !val)}
            type="button"
            className="flex aspect-square h-full items-center justify-center rounded-full hover:bg-skin-hover"
          >
            {show ? (
              <EyeIcon className={`${className}`} />
            ) : (
              <EyeSlashIcon className={`${className}`} />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default FloatingLabelInput;
