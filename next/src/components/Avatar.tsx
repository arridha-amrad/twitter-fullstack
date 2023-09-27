import Image from 'next/image';
import { FC, HTMLAttributes } from 'react';
import Default from '@/images/default.png';
import { twMerge } from 'tailwind-merge';

type Props = {
  src?: string | null;
  width?: number;
  height?: number;
} & HTMLAttributes<HTMLDivElement>;

const Avatar: FC<Props> = ({ src, width, height, ...props }) => {
  const imgSrc = src ? src : Default;
  return (
    <div
      className={twMerge(
        'h-10 w-10 overflow-hidden rounded-full border border-skin-base',
        props.className,
      )}
    >
      <Image
        height={height}
        priority
        width={width}
        className="h-full w-full object-cover"
        src={imgSrc}
        alt="avatar"
      />
    </div>
  );
};

export default Avatar;
