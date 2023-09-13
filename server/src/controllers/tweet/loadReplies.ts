import { Request, Response } from 'express';
import prisma from '@/prisma';
import { TOTAL_TWEETS_LIMIT, getTweetData } from '@/constants/tweet.constants';
import { PageableTweets } from '@/types/tweet.types';

const loadReplies = async (req: Request, res: Response) => {
  const { tweetId, page } = req.params;
  const authenticatedUserId = req.app.locals.userId;
  const intPage = parseInt(page);
  try {
    let tweet = await prisma.tweet.findFirst({
      where: { id: tweetId },
      include: {
        _count: {
          select: { children: true }
        },
        children: {
          skip: (intPage - 1) * TOTAL_TWEETS_LIMIT,
          take: TOTAL_TWEETS_LIMIT,
          include: getTweetData(authenticatedUserId)
        }
      }
    });

    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }

    const total = tweet._count.children;

    const result: PageableTweets = {
      tweets: tweet.children,
      currentPage: intPage,
      hasNextPage: tweet._count.children > intPage * TOTAL_TWEETS_LIMIT,
      total
    };

    return res.status(200).json(result);
  } catch (err) {
    console.log('err : ', err);
    return res.sendStatus(500);
  } finally {
    await prisma.$disconnect();
  }
};

export default loadReplies;
