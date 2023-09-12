import { Request, Response } from 'express';
import prisma from '@/prisma';

export default async function getAllMyLikes(req: Request, res: Response) {
  const authenticatedUserId = req.app.locals.userId;
  const { page = '1' } = req.query as {
    page: string;
  };
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
}
