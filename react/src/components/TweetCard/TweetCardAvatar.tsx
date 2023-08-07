import Avatar from '../Avatar';

type Props = {
  imageURL: string;
};

export default function TweetCardAvatar({ imageURL }: Props) {
  return <Avatar src={imageURL} />;
}
