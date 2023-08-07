import { Dispatch, Fragment, SetStateAction } from 'react';

type Props = {
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  tabList: string[];
};

export default function Tab({ index, setIndex, tabList }: Props) {
  return (
    <Fragment>
      {tabList.map((tab, i) => (
        <button
          onClick={() => {
            setIndex(i);
          }}
          key={i}
          className="flex-1 hover:bg-gray-200/50 hover:backdrop-blur hover:dark:bg-gray-900/10"
        >
          <span
            className={`relative font-semibold ${
              index === i ? '' : 'text-gray-400'
            }`}
          >
            {tab}
            {i === index && (
              <span className="absolute -bottom-5 left-0 right-0 h-1 rounded-full bg-blue-500" />
            )}
          </span>
        </button>
      ))}
    </Fragment>
  );
}
