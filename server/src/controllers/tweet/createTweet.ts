import { CheckCreateTweetRequest } from '@/middlewares/createTweetRequest';
import prisma from '@/prisma';
import { initRepositories } from '@/repositories/initRepository';
import { NextFunction, Request, Response } from 'express';

const createTweet = async (req: Request, res: Response, next: NextFunction) => {
  const { description, fileUrls } = req.app.locals as CheckCreateTweetRequest;
  const authUserId = req.app.locals.userId;

  try {
    const tweet = await prisma.$transaction(
      async (tx) => {
        const { fileRepository, postRepository, tweetRepository } =
          initRepositories(tx, ['post', 'file', 'tweet'], authUserId);

        const newPost = await postRepository.create({
          body: description,
          authorId: authUserId
        });

        if (fileUrls.length > 0) {
          await fileRepository.createMany({
            postId: newPost.id,
            urls: fileUrls,
            userId: authUserId
          });
        }

        const newTweet = await tweetRepository.create({
          postId: newPost.id,
          userId: authUserId,
          type: 'DEFAULT'
        });

        return newTweet;
      },
      { timeout: 10000, maxWait: 5000 }
    );

    return res.status(201).json({ tweet });
  } catch (err) {
    next(err);
  } finally {
    await prisma.$disconnect();
  }
};

export default createTweet;
