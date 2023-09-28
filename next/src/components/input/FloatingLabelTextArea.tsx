import { TextareaHTMLAttributes, useRef } from 'react';

type Props = {
  labelText: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function FloatingLabelTextArea({ labelText, ...props }: Props) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-xl border border-skin-base"
    >
      <textarea
        id={props.id}
        ref={inputRef}
        rows={3}
        onFocus={() => containerRef.current?.focus()}
        {...props}
        className="peer w-full resize-none rounded-xl border-x border-b-[7px] border-t-[25px] border-transparent bg-skin-base px-[14px] text-base leading-6 text-skin-base outline-none focus:ring-4 focus:ring-skin-base focus:ring-offset-0"
        placeholder=""
      />
      <label
        htmlFor={props.id}
        onClick={() => inputRef.current?.focus()}
        className="absolute left-2 top-2 origin-[0] -translate-y-1 scale-75 cursor-text px-2 text-sm text-skin-accent transition-all duration-100 ease-in peer-placeholder-shown:top-[25%]  peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-1 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-skin-base md:text-base"
      >
        {labelText}
      </label>
    </div>
  );
}
