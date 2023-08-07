import HeartIcon from "@heroicons/react/24/outline/HeartIcon";
import IconButton from "../../components/IconButton";
import { FC } from "react";
import { useMeQuery } from "../../redux/user-slice";
import { useLikeTweetMutation } from "../../redux/tweet-slice";
import { toast } from "react-hot-toast";
import ButtonIcon from "../../components/ButtonIcon";

const TweetDetailCardLikeFeature: FC<{
  tweet: Tweet;
}> = ({ tweet }) => {
  const { data } = useMeQuery();
  const isLiked = tweet.post.likes.find((like) => like.userId === data?.id);
  const [likeMutation] = useLikeTweetMutation();
  const like = async () => {
    try {
      likeMutation(tweet).unwrap();
    } catch (err) {
      toast.error("failed to like the tweet");
    }
  };
  return (
    <ButtonIcon
      className="group"
      tooltip={isLiked ? "Dislike" : "Like"}
      onClick={like}
      icon={
        <HeartIcon
          className={`
    ${!isLiked && "group-hover:text-blue-500"} text-slate-500 ${
            isLiked ? "fill-pink-500 text-transparent" : ""
          }`}
        />
      }
    />
  );
};

export default TweetDetailCardLikeFeature;
