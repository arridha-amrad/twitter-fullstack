import { Request, Response } from 'express';
import prisma from '@/prisma';
import { getTweetData } from '../constants';

const LIMIT = 10;

export default async function getAllMyMedia(req: Request, res: Response) {
  const authenticatedUserId = req.app.locals.userId;
  const { page = '1' } = req.query as {
    page: string;
  };

  try {
    const files = await prisma.file.findMany({
      take: LIMIT,
      skip: (parseInt(page) - 1) * LIMIT,
      where: {
        post: {
          authorId: authenticatedUserId
        }
      }
    });

    const tweets: any[] = [];

    for (const file of files) {
      const data = await prisma.tweet.findFirst({
        where: {
          isEnabled: true,
          post: {
            authorId: authenticatedUserId,
            id: file.postId
          }
        },
        include: getTweetData(authenticatedUserId)
      });
      tweets.splice(0, 0, data);
    }
    return res.status(200).json(tweets);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  } finally {
    await prisma.$disconnect();
  }
}
