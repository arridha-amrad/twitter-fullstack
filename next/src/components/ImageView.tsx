import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import ButtonIcon from './Buttons/ButtonIcon';

const ImageView = ({
  urls,
  remove,
}: {
  urls: string[];
  remove: (url: string) => void;
}) => {
  if (urls.length === 0) return null;
  const sum: number = urls.length;
  let classNames: string[] = [];
  const pickClass = () => {
    switch (sum) {
      case 4:
        classNames = [
          'w-full h-full',
          'w-full h-full',
          'w-full h-full',
          'w-full h-full',
        ];
        break;
      case 3:
        classNames = ['row-span-2', 'w-full h-full', 'w-full h-full'];
        break;
      case 2:
        classNames = ['row-span-2', 'row-span-2'];
        break;
      case 1:
        classNames = ['row-span-2 col-span-2'];
    }
  };
  pickClass();
  return (
    <div className="grid h-[300px] w-full grid-cols-2 grid-rows-2 gap-2 overflow-clip rounded-xl">
      {urls.map((val, i) => (
        <div
          key={i}
          className={`relative overflow-clip rounded-xl ${classNames[i]} `}
        >
          <div className="absolute left-2 top-2 aspect-square w-8 rounded-full bg-black/70">
            <ButtonIcon
              className=""
              icon={<XMarkIcon className="w-5" />}
              tooltip="Remove"
              onClick={() => remove(val)}
            />
          </div>

          <img className="h-full w-full object-cover" alt="profile" src={val} />
        </div>
      ))}
    </div>
  );
};

export default ImageView;
