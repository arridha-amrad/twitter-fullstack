import ChartBarSquareIcon from '@heroicons/react/24/outline/ChartBarSquareIcon';
import FaceSmileIcon from '@heroicons/react/24/outline/FaceSmileIcon';
import GifIcon from '@heroicons/react/24/outline/GifIcon';
import MapPinIcon from '@heroicons/react/24/outline/MapPinIcon';
import PhotoIcon from '@heroicons/react/24/outline/PhotoIcon';
import { ChangeEvent, useRef } from 'react';
import IconButton from '../iconButton';

type Props = {
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const ButtonFilesPickers = ({ onFileChange }: Props) => {
  const mediaRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className="flex h-full flex-1 items-center">
      <IconButton
        onClick={() => mediaRef.current?.click()}
        className={className.button}
        icon={<PhotoIcon className={className.icon} />}
        tooltip="Media"
      />
      <IconButton
        className={className.button}
        icon={<GifIcon className={className.icon} />}
        tooltip="Gif"
      />
      <IconButton
        className={className.button}
        icon={<ChartBarSquareIcon className={className.icon} />}
        tooltip="Poll"
      />
      <IconButton
        className={className.button}
        icon={<FaceSmileIcon className={className.icon} />}
        tooltip="Emoji"
      />
      <IconButton
        className={className.button}
        icon={<MapPinIcon className={className.icon} />}
        tooltip="Location"
      />
      <input
        onChange={onFileChange}
        ref={mediaRef}
        className="hidden"
        multiple
        type="file"
      />
    </div>
  );
};

const className = {
  button: 'hover:bg-skin-fill/20',
  icon: 'w-5 stroke-skin-base',
};

export default ButtonFilesPickers;
