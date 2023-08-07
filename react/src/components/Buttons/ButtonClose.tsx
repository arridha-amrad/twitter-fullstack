import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import ButtonIcon from '../ButtonIcon';

type Props = {
  closeFn: () => void;
};

export default function ButtonClose({ closeFn }: Props) {
  return (
    <div className="h-8">
      <ButtonIcon
        onClick={closeFn}
        className="hover:dark:bg-gray-800 hover:bg-gray-200"
        icon={<XMarkIcon className="w-6 stroke-2 stroke-gray-400" />}
        tooltip="Close"
      />
    </div>
  );
}
