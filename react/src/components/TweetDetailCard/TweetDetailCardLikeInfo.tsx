import { FC } from "react";

const TweetDetailCardLikeInfo: FC<{ tweet: Tweet }> = ({ tweet }) => {
  return (
    <div className="flex-1 text-sm">
      <span className="mr-3 font-bold">{tweet.post._count.likes}</span> Likes
    </div>
  );
};

export default TweetDetailCardLikeInfo;
