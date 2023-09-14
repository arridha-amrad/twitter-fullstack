import { Request, Response } from 'express';
import prisma from '@/prisma';
import { initRepositories } from '@/repositories/initRepository';
import { TOTAL_TWEETS_LIMIT, getTweetData } from '@/constants/tweet.constants';

const loadTweet = async (req: Request, res: Response) => {
  const { tweetId } = req.params;
  const authenticatedUserId = req.app.locals.userId;
  const { tweetRepository } = initRepositories(prisma, ['tweet']);
  try {
    const tweet = await prisma.tweet.findFirst({
      where: { id: tweetId }
    });

    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }

    if (tweet.deletedAt) {
      return res.status(400).json({ message: 'This tweet is not available' });
    }

    // if (tweet.isRetweet) {
    //   const originalTweet = await prisma.tweet.findFirst({
    //     where: { postId: tweet.postId, isRetweet: false }
    //   });
    //   const children = await prisma.tweet.findMany({
    //     where: { parentId: originalTweet?.id, isRetweet: false },
    //     include: { ...getTweetData(authenticatedUserId) }
    //   });
    //   tweet.children = children;
    // }

    // if (tweet.parentId) {
    //   await loadParentTweet(tweet, authenticatedUserId);
    // }

    return res.status(200).json(tweet);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  } finally {
    await prisma.$disconnect();
  }
};

export default loadTweet;
