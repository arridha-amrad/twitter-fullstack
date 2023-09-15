import { Request, Response } from 'express';
import prisma from '@/prisma';
import { initRepositories } from '@/repositories/initRepository';

const like = async (req: Request, res: Response) => {
  const { postId } = req.body;
  const userId = req.app.locals.userId;

  if (!postId) {
    return res.status(400).json({ message: 'tweetId is required' });
  }

  try {
    await prisma.$transaction(async (tx) => {
      const { likeRepository, postRepository } = initRepositories(tx, [
        'like',
        'post'
      ]);
      const post = await postRepository.findOne({ id: postId });
      if (!post) {
        return res.sendStatus(404);
      }
      const isLiked = await likeRepository.findOne({ postId, userId });
      let message = '';
      if (isLiked) {
        await likeRepository.remove({ postId, userId });
        message = 'unLiked';
      } else {
        await likeRepository.create({ postId, userId });
        message = 'liked';
      }
      return res.status(201).json({ message });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send('Server error');
  } finally {
    await prisma.$disconnect();
  }
};

export default like;
