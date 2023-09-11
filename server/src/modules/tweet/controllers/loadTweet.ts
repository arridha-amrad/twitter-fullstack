import { Request, Response } from 'express';
import prisma from '@/utils/prisma';
import { loadParentTweet } from '../utils/loadParentTweet';
import { TOTAL_TWEETS_LIMIT, getTweetData } from '../constants';
import { getAuthId } from '@/utils/authId';

const loadTweet = async (req: Request, res: Response) => {
  const { tweetId } = req.params;
  const authenticatedUserId = getAuthId();

  try {
    const tweet = await prisma.tweet.findFirst({
      where: { id: tweetId },
      include: {
        ...getTweetData(authenticatedUserId),
        children: {
          include: { ...getTweetData(authenticatedUserId) },
          orderBy: { createdAt: 'desc' },
          take: TOTAL_TWEETS_LIMIT,
          skip: 0
        }
      }
    });

    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }

    if (!tweet.isEnabled) {
      return res.status(400).json({ message: 'This tweet is not available' });
    }

    if (tweet.isRetweet) {
      const originalTweet = await prisma.tweet.findFirst({
        where: { postId: tweet.postId, isRetweet: false }
      });
      const children = await prisma.tweet.findMany({
        where: { parentId: originalTweet?.id, isRetweet: false },
        include: { ...getTweetData(authenticatedUserId) }
      });
      tweet.children = children;
    }

    if (tweet.parentId) {
      await loadParentTweet(tweet, authenticatedUserId);
    }

    return res.status(200).json(tweet);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  } finally {
    await prisma.$disconnect();
  }
};

export default loadTweet;
