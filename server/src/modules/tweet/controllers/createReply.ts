import { Request, Response } from 'express';
import prisma from '@/utils/prisma';
import { getTweetData } from '../tweet.constants';
import { loadParentTweet } from '../utils/loadParentTweet';
import { CheckReplyRequest } from '../middlewares/checkReplyRequest';
import TweetService from '../repositories/tweet.service';
import { getAuthId } from '@/utils/authId';
import PostService from '../repositories/post.service';
import FileService from '../repositories/file.repositories';

const createReply = async (req: Request, res: Response) => {
  const { description, fileUrls, parentTweet, postId } = req.app
    .locals as CheckReplyRequest;
  const authenticatedUserId = getAuthId()!;
  try {
    const newTweet = await prisma.$transaction(async (tx) => {
      const tweetService = new TweetService(tx['tweet']);
      const postService = new PostService(tx.post);
      const fileService = new FileService(tx.file);

      const newPost = await postService.create({
        body: description,
        authorId: authenticatedUserId,
        parentId: postId
      });

      await fileService.createMany({
        postId: newPost.id,
        urls: fileUrls,
        userId: authenticatedUserId
      });

      const newTweet = await tweetService.create({
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
