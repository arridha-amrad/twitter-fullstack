type Item = {
  title: string;
  tweet: string;
  total: number;
};

const TrendsCard = () => {
  const trendItem: Item[] = [
    { title: 'Trending in Indonesia', tweet: 'Indonesia', total: 6571 },
    { title: 'Trending in Indonesia', tweet: 'Lionel Messi', total: 1600 },
    { title: 'Trending in Indonesia', tweet: 'Javascript', total: 6571 },
    { title: 'Trending in Indonesia', tweet: 'React', total: 3242 },
    { title: 'Trending in Indonesia', tweet: 'Flutter', total: 2321 },
    { title: 'Trending in Indonesia', tweet: 'Indonesia', total: 6571 },
    { title: 'Trending in Indonesia', tweet: 'Lionel Messi', total: 1600 },
    { title: 'Trending in Indonesia', tweet: 'Javascript', total: 6571 },
    { title: 'Trending in Indonesia', tweet: 'React', total: 3242 },
    { title: 'Trending in Indonesia', tweet: 'Flutter', total: 2321 }
  ];
  return (
    <div className="flex flex-col w-full overflow-hidden bg-gray-100 dark:bg-gray-900 rounded-2xl">
      <h1 className="px-5 py-2 text-xl font-bold">Trends for you</h1>
      {trendItem.map((item, i) => (
        <div
          key={i}
          className="px-5 py-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          <h5 className="text-xs font-medium text-gray-600 dark:text-gray-400">
            {item.title}
          </h5>
          <p className="font-semibold">{item.tweet}</p>
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
            {item.total} Tweets
          </p>
        </div>
      ))}
    </div>
  );
};

export default TrendsCard;
