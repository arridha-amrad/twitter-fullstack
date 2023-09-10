import { getAuthId } from '@/utils/authId';
import prisma from '@/utils/prisma';
import { Request, Response } from 'express';
import { uploadFiles } from '../repositories/filesServices';
import { getTweetData } from '../tweet.constants';

const createTweet = async (req: Request, res: Response) => {
  const postDescription = req.body.description;
  const files = req.files?.files;
  const authenticatedUserId = getAuthId();

  if (!authenticatedUserId) {
    return res.sendStatus(401);
  }

  try {
    const tweet = await prisma.$transaction(
      async (tx) => {
        const newPost = await tx.post.create({
          data: {
            body: postDescription,
            authorId: authenticatedUserId
          }
        });

        if (files) {
          const urls = await uploadFiles(files);
          await tx.file.createMany({
            data: urls.map((url) => ({
              postId: newPost.id,
              url,
              userId: authenticatedUserId
            }))
          });
        }

        const newTweet = await tx.tweet.create({
          data: {
            isRetweet: false,
            userId: authenticatedUserId,
            postId: newPost.id
          },
          include: getTweetData(authenticatedUserId)
        });

        return newTweet;
      },
      { timeout: 10000, maxWait: 5000 }
    );

    return res.status(201).json({ tweet: tweet });
  } catch (err) {
    console.log('err : ', err);
    return res.sendStatus(500);
  } finally {
    await prisma.$disconnect();
  }
};

export default createTweet;
