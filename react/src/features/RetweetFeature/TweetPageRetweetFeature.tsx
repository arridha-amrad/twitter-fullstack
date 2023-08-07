import RetweetIcon from "@heroicons/react/24/outline/ArrowPathRoundedSquareIcon";
import IconButton from "../../components/IconButton";
import { useRetweetMutation } from "../../redux/tweet-slice";
import { FC } from "react";
import { useMeQuery } from "../../redux/user-slice";
import { toast } from "react-hot-toast";
import ButtonIcon from "../../components/ButtonIcon";

const TweetPageRetweetFeature: FC<{ tweet: Tweet }> = ({ tweet }) => {
  const { data } = useMeQuery();

  const isRetweet = tweet.post.retweets.find((rt) => rt.userId === data?.id);
  const [retweetMutation] = useRetweetMutation();
  const retweet = async () => {
    try {
      const data = await retweetMutation(tweet).unwrap();
    } catch (error) {
      console.log(error);
      toast.error("failed to retweet");
    }
  };
  return (
    <ButtonIcon
      onClick={retweet}
      className="group"
      tooltip={isRetweet ? "UnRetweet" : "Retweet"}
      icon={
        <RetweetIcon
          className={`group-hover:text-green-500 ${
            !!isRetweet ? "text-green-500" : "text-slate-500"
          }
    `}
        />
      }
    />
  );
};

export default TweetPageRetweetFeature;
