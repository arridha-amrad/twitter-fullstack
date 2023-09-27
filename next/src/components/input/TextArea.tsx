"use client"

import {
  ForwardRefRenderFunction,
  TextareaHTMLAttributes,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
  useRef
} from 'react';
import { twMerge } from 'tailwind-merge';

const className =
  'z-0 mt-2 w-full overflow-auto border-none bg-skin-base text-lg outline-none ring-0 placeholder:text-xl';

function updateTextAreaSize(textArea: HTMLTextAreaElement | null) {
  if (textArea == null) return;
  textArea.style.height = 'fit-content';
  textArea.style.height = `${textArea.scrollHeight}px`;
}

export type TextAreaHandle = {
  getFocus: () => void;
};

const TextArea: ForwardRefRenderFunction<
  TextAreaHandle,
  TextareaHTMLAttributes<HTMLTextAreaElement>
> = (props, ref) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
    updateTextAreaSize(textArea);
    textAreaRef.current = textArea;
    return textAreaRef;
  }, []);

  useLayoutEffect(() => {
    updateTextAreaSize(textAreaRef?.current);
  }, [props.value]);

  useImperativeHandle(
    ref,
    () => {
      return {
        getFocus() {
          textAreaRef.current?.focus();
        }
      };
    },
    []
  );

  return (
    <textarea
      ref={inputRef}
      style={{
        height: 'fit-content',
        maxHeight: props.style?.maxHeight
      }}
      rows={1}
      className={twMerge(className)}
      {...props}
    />
  );
};

export default forwardRef(TextArea);
