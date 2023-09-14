import { NextFunction, Request, Response } from 'express';
import prisma from '@/prisma';
import { CheckCreateReplyRequest } from '../../middlewares/createReplyRequest';

import { initRepositories } from '../../repositories/initRepository';

const createReply = async (req: Request, res: Response, next: NextFunction) => {
  const { description, fileUrls, postId, authenticatedUserId } = req.app
    .locals as CheckCreateReplyRequest;

  try {
    const newTweet = await prisma.$transaction(
      async (tx) => {
        const { fileRepository, postRepository, tweetRepository } =
          initRepositories(tx, ['file', 'post', 'tweet'], authenticatedUserId);

        const newPost = await postRepository.create({
          body: description,
          authorId: authenticatedUserId
        });

        await fileRepository.createMany({
          postId: newPost.id,
          urls: fileUrls,
          userId: authenticatedUserId
        });

        const newTweet = await tweetRepository.create({
          postId: newPost.id,
          userId: authenticatedUserId,
          replyPostId: postId,
          type: 'REPLY'
        });

        return newTweet;
      },
      { timeout: 10000, maxWait: 5000 }
    );

    return res.status(201).json({ reply: newTweet });
  } catch (error) {
    next(error);
  } finally {
    await prisma.$disconnect();
  }
};

export default createReply;
