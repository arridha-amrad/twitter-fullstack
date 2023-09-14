import { NextFunction, Request, Response } from 'express';
import prisma from '@/prisma';
import { initRepositories } from '@/repositories/initRepository';
import TweetService from '@/services/TweetService';

const loadTweet = async (req: Request, res: Response, next: NextFunction) => {
  const { tweetId } = req.params;
  const userId = req.app.locals.userId;
  const { tweetRepository } = initRepositories(prisma, ['tweet'], userId);
  const tweetService = new TweetService(tweetRepository);
  try {
    const tweet = await tweetRepository.findById(tweetId, true);
    if (!tweet || !tweet.postId) {
      return res.status(404).json({ message: 'Tweet not found' });
    }
    const tweetWithParents = await tweetService.loadWithParent(tweet);
    const children = await tweetRepository.loadReplies(tweet.postId, 1);

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

    return res.status(200).json({ tweet: tweetWithParents, children });
  } catch (err) {
    next(err);
  } finally {
    await prisma.$disconnect();
  }
};

export default loadTweet;
