import { TweetEntity } from '../tweet.entities';
import { getAuthId } from '@/utils/authId';
import { getTweetData } from '../tweet.constants';

export type CreateTweetDto = {
  postId: string;
  userId: string;
  parentId: string | null;
  isRetweet: boolean;
};

class TweetService {
  authUserId?: string;
  constructor(private Tweet: TweetEntity) {
    this.authUserId = getAuthId();
  }

  async create(data: CreateTweetDto) {
    const newTweet = await this.Tweet.create({
      data: {
        ...data
      },
      include: getTweetData(this.authUserId)
    });
    return newTweet;
  }

  async populateTweet(tweetId: string) {
    return this.Tweet.findFirst({
      where: {
        id: tweetId
      },
      include: getTweetData(this.authUserId)
    });
  }
}

export default TweetService;
