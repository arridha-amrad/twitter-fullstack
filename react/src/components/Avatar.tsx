import { ImgHTMLAttributes } from 'react';
import getDefaultAvatar from '../utils/getDefaultAvatar';

type Props = ImgHTMLAttributes<HTMLImageElement>;

const Avatar = (props: Props) => {
  const source = props.src === 'default' ? getDefaultAvatar() : props.src;
  return (
    <div className="h-10 w-10 overflow-hidden rounded-full border border-gray-200 dark:border-gray-700">
      <img className="h-full w-full object-cover" src={source} alt="avatar" />
    </div>
  );
};

export default Avatar;
