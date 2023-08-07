import CircleLoader from '../Loaders/CircleLoader';

type Props = {
  isLoading: boolean;
  state: string;
  submitFn: () => void;
};

const ButtonTweetComposer = ({ isLoading, state, submitFn }: Props) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        submitFn();
      }}
      disabled={state.length >= 200 || isLoading || !state}
      className="ml-1 flex items-center gap-2 rounded-full bg-blue-500 px-5 py-1.5 text-sm font-semibold text-white disabled:brightness-75"
    >
      Reply
      {isLoading && (
        <CircleLoader className="text-gray-300/50 w-4 h-4 fill-white" />
      )}
    </button>
  );
};

export default ButtonTweetComposer;
