import { Request, Response } from 'express';
import prisma from '@/prisma';
import { getAuthId } from '@/utils/authId';
import { initRepositories } from '../repositories';
const deleteTweet = async (req: Request, res: Response) => {
  const { tweetId } = req.params;
  const authUserId = getAuthId()!;

  try {
    await prisma.$transaction(async (tx) => {
      const { fileRepository, postRepository, tweetRepository } =
        initRepositories(tx, ['file', 'post', 'tweet']);
      const tweet = await tweetRepository.findById(tweetId);
      if (!tweet) {
        return res.sendStatus(404);
      }
      if (tweet.userId !== authUserId) {
        return res.status(401);
      }
      if (!tweet.isRetweet) {
        await tweetRepository.delete(tweet.id);
      }
    });

    return res.status(200).json({ message: 'Tweet deleted' });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  } finally {
    await prisma.$disconnect();
  }
};

export default deleteTweet;
