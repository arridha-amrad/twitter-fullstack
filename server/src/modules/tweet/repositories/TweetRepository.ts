import { TweetEntity } from '../tweet.entities';
import { getAuthId } from '@/utils/authId';
import { TOTAL_TWEETS_LIMIT, getTweetData } from '../tweet.constants';
import { Tweet as ITweet, Prisma } from '@prisma/client';

export type CreateTweetDto = {
  postId: string;
  userId: string;
  parentId: string | null;
  isRetweet: boolean;
};

export type TweetWithParents = ITweet & { parents: ITweet[] };

class TweetRepository {
  private authUserId?: string;

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

  private async loadParent(
    tweet: ITweet & { parent?: null | ITweet },
    parents: ITweet[]
  ) {
    if (tweet.parentId) {
      const parent = await this.findById(tweet.parentId);
      if (parent) {
        parents.push(parent);
        await this.loadParent(parent, parents);
      }
    }
    return parents;
  }

  async loadWithParent(tweet: ITweet) {
    let tweetWithParents: TweetWithParents;
    const parents = await this.loadParent(tweet, []);
    tweetWithParents = {
      ...tweet,
      parents
    };
    return tweetWithParents;
  }

  async findById(tweetId: string) {
    return this.Tweet.findFirst({
      where: {
        id: tweetId
      },
      include: getTweetData(this.authUserId)
    });
  }

  async sumForYouTweets(filter?: Prisma.TweetWhereInput) {
    return this.Tweet.count({
      where: {
        isEnabled: true,
        ...filter
      }
    });
  }

  async pagingTweets(page: number, filter?: Prisma.TweetWhereInput) {
    return this.Tweet.findMany({
      orderBy: { createdAt: 'desc' },
      take: TOTAL_TWEETS_LIMIT,
      skip: (page - 1) * TOTAL_TWEETS_LIMIT,
      include: getTweetData(this.authUserId),
      where: {
        isEnabled: true,
        ...filter
      }
    });
  }
}

export default TweetRepository;
