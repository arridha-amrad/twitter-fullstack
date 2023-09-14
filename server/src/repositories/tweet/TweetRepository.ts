import { TOTAL_TWEETS_LIMIT, getTweetData } from '@/constants/tweet.constants';
import { Prisma } from '@prisma/client';
import { TweetEntity } from '../../entities';
import { CreateTweetDto } from './types';

type FindOneTweet = Prisma.TweetWhereInput;

class TweetRepository {
  constructor(private Tweet: TweetEntity, private authUserId?: string) {}

  async loadReplies(replyPostId: string, page: number) {
    return this.Tweet.findMany({
      where: {
        replyPostId
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: TOTAL_TWEETS_LIMIT,
      skip: (page - 1) * TOTAL_TWEETS_LIMIT,
      include: getTweetData(this.authUserId)
    });
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

  async findOne(filter: FindOneTweet, isExtend: boolean = false) {
    return this.Tweet.findFirst({
      where: {
        ...filter,
        deletedAt: null
      },
      include: isExtend ? getTweetData(this.authUserId) : undefined
    });
  }

  async findParent(replyPostId: string) {
    return this.Tweet.findMany({
      where: {
        replyPostId
      },
      include: getTweetData(this.authUserId)
    });
  }

  async findById(tweetId: string, isExtend: boolean = false) {
    return this.Tweet.findFirst({
      where: {
        id: tweetId,
        deletedAt: null
      },
      include: isExtend ? getTweetData(this.authUserId) : undefined
    });
  }

  async delete(id: string) {
    return this.Tweet.update({
      where: {
        id
      },
      data: {
        deletedAt: new Date(),
        postId: null
      }
    });
  }

  async hardDelete(id: string) {
    return this.Tweet.delete({
      where: {
        id
      }
    });
  }

  async sumTweets(filter?: Prisma.TweetWhereInput) {
    return this.Tweet.count({
      where: {
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
        postId: {
          not: null
        },
        ...filter
      }
    });
  }
}

export default TweetRepository;
