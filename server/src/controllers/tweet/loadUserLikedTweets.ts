import { Request, Response } from 'express';
import prisma from '@/prisma';

const loadUserLikedTweets = async (req: Request, res: Response) => {
  const authenticatedUserId = req.app.locals.userId;
  const { username, page } = req.params;
  try {
    const likes = await prisma.like.findMany({
      where: {
        userId: authenticatedUserId
      }
    });
    const tweets = [];
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  } finally {
    await prisma.$disconnect();
  }
};

export default loadUserLikedTweets;
