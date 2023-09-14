import { NextFunction, Request, Response } from 'express';
import prisma from '@/prisma';
import { initRepositories } from '@/repositories/initRepository';
import TweetService from '@/services/TweetService';

const reTweet = async (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.body;
  const authenticatedUserId = req.app.locals.userId;

  try {
    await prisma.$transaction(async (tx) => {
      const { tweetRepository, repostRepository } = initRepositories(tx, [
        'tweet',
        'repost'
      ]);
      const tweet = await tweetRepository.findOne({
        postId,
        type: { not: 'RETWEET' }
      });
      if (!tweet) return res.sendStatus(404);
      let message = '';
      const isAlreadyRepost = await tweetRepository.findOne({
        postId,
        userId: authenticatedUserId,
        type: 'RETWEET'
      });
      if (!isAlreadyRepost) {
        await repostRepository.create({
          postId,
          userId: authenticatedUserId
        });
        const { id, createdAt, updatedAt, type, userId, ...rest } = tweet;
        const reTweet = await tweetRepository.create({
          ...rest,
          type: 'RETWEET',
          userId: authenticatedUserId
        });
        message = 'retweeted';
        const tweetService = new TweetService(tweetRepository);
        const tweetWithParents = await tweetService.loadWithParent(reTweet);
        return res.status(200).json({ message, tweet: tweetWithParents });
      } else {
        await repostRepository.remove({ postId, userId: authenticatedUserId });
        await tweetRepository.hardDelete(isAlreadyRepost.id);
        message = 'unRetweeted';
        return res.status(200).json({ message, tweet: null });
      }
    });
  } catch (err) {
    next(err);
  } finally {
    await prisma.$disconnect();
  }
};

export default reTweet;
