import { Request, Response } from 'express';
import prisma from '@/prisma';
import { getAuthId } from '@/utils/authId';

const like = async (req: Request, res: Response) => {
  const { tweetId } = req.body;
  if (!tweetId) {
    return res.status(400).json({ message: 'tweetId is required' });
  }

  const userId = getAuthId()!;

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
      const like = await tx.like.findFirst({
        where: { postId, userId }
      });
      let message = '';
      if (like) {
        await tx.like.delete({
          where: { postId_userId: { postId, userId } }
        });
        message = 'unLiked';
      } else {
        await tx.like.create({
          data: {
            postId,
            userId
          }
        });
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
