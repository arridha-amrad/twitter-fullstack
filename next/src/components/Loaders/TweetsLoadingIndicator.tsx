import CircleLoader from './CircleLoader';

export default function TweetsLoadingIndicator() {
  return (
    <div className="sticky bottom-0 flex h-10 w-full items-center justify-center bg-gray-300/30 backdrop-blur dark:bg-black/30">
      <CircleLoader />
    </div>
  );
}
