import { Request, Response } from 'express';
import prisma from '@/prisma';
import { CheckCreateReplyRequest } from '../middlewares/checkCreateReplyRequest';
import { getAuthId } from '@/utils/authId';
import { initRepositories } from '../repositories';

const createReply = async (req: Request, res: Response) => {
  const { description, fileUrls, parentTweet, postId } = req.app
    .locals as CheckCreateReplyRequest;
  const authenticatedUserId = getAuthId()!;
  try {
    const newTweet = await prisma.$transaction(async (tx) => {
      const { fileRepository, postRepository, tweetRepository } =
        initRepositories(tx, ['file', 'post', 'tweet']);

      const newPost = await postRepository.create({
        body: description,
        authorId: authenticatedUserId,
        parentId: postId
      });

      await fileRepository.createMany({
        postId: newPost.id,
        urls: fileUrls,
        userId: authenticatedUserId
      });

      const newTweet = await tweetRepository.create({
        postId: newPost.id,
        userId: authenticatedUserId,
        parentId: parentTweet.id,
        isRetweet: false
      });

      return newTweet;
    });

    return res.status(201).json({ reply: newTweet });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server Error');
  } finally {
    await prisma.$disconnect();
  }
};

export default createReply;
