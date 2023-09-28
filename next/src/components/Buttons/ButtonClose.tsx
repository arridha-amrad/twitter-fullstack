import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import ButtonIcon from './ButtonIcon';

type Props = {
  closeFn: () => void;
};

export default function ButtonClose({ closeFn }: Props) {
  return (
    <div className="h-8">
      <ButtonIcon
        onClick={closeFn}
        icon={<XMarkIcon className="w-6 stroke-2 text-skin-base" />}
        tooltip="Close"
      />
    </div>
  );
}
