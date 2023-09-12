import { getAuthId } from '@/utils/authId';
import prisma from '@/prisma';
import { Request, Response } from 'express';
import { CheckCreateTweetRequest } from '../middlewares/checkCreateTweetRequest';
import { initRepositories } from '../repositories';

const createTweet = async (req: Request, res: Response) => {
  const { description, fileUrls } = req.app.locals as CheckCreateTweetRequest;
  const authUserId = getAuthId()!;

  try {
    const tweet = await prisma.$transaction(
      async (tx) => {
        const { fileRepository, postRepository, tweetRepository } =
          initRepositories(tx, ['post', 'file', 'tweet']);

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
          isRetweet: false,
          parentId: null,
          postId: newPost.id,
          userId: authUserId
        });

        return newTweet;
      },
      { timeout: 10000, maxWait: 5000 }
    );

    return res.status(201).json({ tweet });
  } catch (err) {
    console.log('err : ', err);
    return res.sendStatus(500);
  } finally {
    await prisma.$disconnect();
  }
};

export default createTweet;
