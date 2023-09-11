import { Request, Response } from 'express';
import prisma from '@/utils/prisma';
import { CheckReplyRequest } from '../middlewares/checkReplyRequest';
import { getAuthId } from '@/utils/authId';
import { getEntities } from '../tweet.entities';

const createReply = async (req: Request, res: Response) => {
  const { description, fileUrls, parentTweet, postId } = req.app
    .locals as CheckReplyRequest;
  const authenticatedUserId = getAuthId()!;
  try {
    const newTweet = await prisma.$transaction(async (tx) => {
      const { fileRepository, postRepository, tweetRepository } = getEntities(
        tx,
        ['file', 'post', 'tweet']
      );

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
