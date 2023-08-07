import { TextareaHTMLAttributes, forwardRef } from 'react';

const TextArea = forwardRef<
  {} & HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>((props, ref) => {
  return (
    <textarea
      {...props}
      ref={ref}
      rows={4}
      className={`w-full rounded-lg bg-white px-3 text-sm text-gray-700 focus:ring-4 focus:ring-blue-300 dark:bg-slate-800 dark:text-slate-300 dark:placeholder-gray-400 dark:focus:ring-blue-500 md:text-base ${props.className}`}
    ></textarea>
  );
});

export default TextArea;
