import ChartBarSquareIcon from '@heroicons/react/24/outline/ChartBarSquareIcon';
import FaceSmileIcon from '@heroicons/react/24/outline/FaceSmileIcon';
import GifIcon from '@heroicons/react/24/outline/GifIcon';
import MapPinIcon from '@heroicons/react/24/outline/MapPinIcon';
import PhotoIcon from '@heroicons/react/24/outline/PhotoIcon';
import { ChangeEvent, useRef } from 'react';
import ButtonIcon from '../ButtonIcon';

type Props = {
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const ButtonFilesPickers = ({ onFileChange }: Props) => {
  const mediaRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className="flex h-full flex-1 items-center">
      <ButtonIcon
        onClick={() => mediaRef.current?.click()}
        className="hover:bg-blue-500/20"
        icon={<PhotoIcon className="w-5 stroke-blue-500" />}
        tooltip="Media"
      />
      <ButtonIcon
        className="hover:bg-blue-500/20"
        icon={<GifIcon className="w-5 stroke-blue-500" />}
        tooltip="Gif"
      />
      <ButtonIcon
        className="hover:bg-blue-500/20"
        icon={<ChartBarSquareIcon className="w-5 stroke-blue-500" />}
        tooltip="Poll"
      />
      <ButtonIcon
        className="hover:bg-blue-500/20"
        icon={<FaceSmileIcon className="w-5 stroke-blue-500" />}
        tooltip="Emoji"
      />
      <ButtonIcon
        className="hover:bg-blue-500/20"
        icon={<MapPinIcon className="w-5 stroke-blue-500" />}
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

export default ButtonFilesPickers;
