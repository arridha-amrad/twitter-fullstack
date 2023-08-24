import { Dispatch, Fragment, SetStateAction } from 'react';

type Props = {
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  tabList: string[];
  callback?: VoidFunction;
};

export default function Tab({ index, setIndex, tabList, callback }: Props) {
  return (
    <Fragment>
      {tabList.map((tab, i) => (
        <button
          onClick={() => {
            setIndex(i);
            if (callback) {
              callback();
            }
          }}
          key={i}
          className="flex-1 h-full hover:bg-gray-200/50 hover:backdrop-blur hover:dark:bg-gray-700/50"
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
