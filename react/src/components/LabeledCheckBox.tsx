import { FC, InputHTMLAttributes, ReactNode } from "react";

const LabeledCheckBox: FC<
  {
    children: ReactNode;
  } & InputHTMLAttributes<HTMLInputElement>
> = ({ children, ...props }) => {
  return (
    <div className="flex items-center mb-4">
      <input
        {...props}
        id="default-checkbox"
        type="checkbox"
        className="w-5 h-5 text-blue-500 cursor-pointer rounded-md dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-500 focus:ring-offset-2 checked:bg-blue-500 dark:checked:bg-blue-600"
      />
      <label
        htmlFor="default-checkbox"
        className="ml-2 text-sm subpixel-antialiased text-gray-500 dark:text-gray-300  md:text-base"
      >
        {children}
      </label>
    </div>
  );
};

export default LabeledCheckBox;
