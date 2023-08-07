import { useCallback, useRef } from 'react';

type Props<T> = {
  isLoading: boolean;
  items: T[];
  callback: VoidFunction;
};

export default function useLastItemRef<T>({
  isLoading,
  items,
  callback
}: Props<T>) {
  const observer = useRef<IntersectionObserver>();
  const lastTweetRef = useCallback(
    (element: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (!items) return;
          callback();
        }
      });
      if (element) {
        observer.current.observe(element);
      }
    },
    [isLoading, items]
  );

  return lastTweetRef;
}
