import { Request, Response } from 'express';
import prisma from '@/prisma';
import { initRepositories } from '@/repositories/initRepository';

const like = async (req: Request, res: Response) => {
  const { tweetId } = req.body;
  const userId = req.app.locals.userId;

  if (!tweetId) {
    return res.status(400).json({ message: 'tweetId is required' });
  }

  try {
    const tweet = await prisma.tweet.findFirst({ where: { id: tweetId } });
    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }

    const postId = tweet.postId;
    if (!postId) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const message = await prisma.$transaction(async (tx) => {
      const { likeRepository } = initRepositories(tx, ['like']);
      const isLiked = await likeRepository.findOne({ postId, userId });
      let message = '';
      if (isLiked) {
        await likeRepository.remove({ postId, userId });
        message = 'unLiked';
      } else {
        await likeRepository.create({ postId, userId });
        message = 'liked';
      }
      return message;
    });

    return res.status(201).json({ message });
  } catch (err) {
    console.log(err);
    return res.status(500).send('Server error');
  } finally {
    await prisma.$disconnect();
  }
};

export default like;
