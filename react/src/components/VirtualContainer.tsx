import {
  VirtualItem,
  Virtualizer,
  useWindowVirtualizer
} from '@tanstack/react-virtual';
import { LegacyRef, ReactNode, useLayoutEffect, useRef } from 'react';
import CircleLoader from './Loaders/CircleLoader';

type ChildProps = {
  parentRef: LegacyRef<HTMLDivElement>;
  items: VirtualItem[];
  virtualizer: Virtualizer<Window, Element>;
};

type Props = {
  list: Tweet[];
  isLoading: boolean;
  children: ({ items, virtualizer }: ChildProps) => ReactNode;
};

export function WindowBasedVirtualContainer({
  list,
  isLoading,
  children
}: Props) {
  const parentRef = useRef<HTMLDivElement>(null);
  const parentOffsetRef = useRef(0);

  useLayoutEffect(() => {
    parentOffsetRef.current = parentRef.current?.offsetTop ?? 0;
  }, [list]);

  const virtualizer = useWindowVirtualizer({
    count: list.length,
    estimateSize: () => 45,
    scrollMargin: parentOffsetRef.current,
    getItemKey(index) {
      return list[index].id;
    },
    overscan: 5
  });

  const items = virtualizer.getVirtualItems();

  if (isLoading) {
    return (
      <div className="my-10 flex w-full flex-col items-center justify-center">
        <CircleLoader />
      </div>
    );
  }
  if (!children) return null;

  return children({ items, virtualizer, parentRef });
}

export const VirtualContainer = ({
  items,
  virtualizer,
  parentRef,
  children
}: ChildProps & { children: ReactNode }) => {
  return (
    <div ref={parentRef}>
      <div
        style={{
          height: virtualizer.getTotalSize(),
          width: '100%',
          position: 'relative'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            transform: `translateY(${
              items[0].start - virtualizer.options.scrollMargin
            }px)`
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
