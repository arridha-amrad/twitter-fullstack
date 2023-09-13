import { NextFunction, Request, Response } from 'express';
import prisma from '@/prisma';
import { Tweet } from '@prisma/client';
import FileService from '@/services/FileService';
import { initRepositories } from '@/repositories/initRepository';

export type CheckCreateReplyRequest = {
  description: string;
  postId: string;
  parentTweet: Tweet;
  fileUrls: string[];
  authenticatedUserId: string;
};

export const checkCreateReplyRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { description, postId } = req.body;
  const files = req.files?.files;
  const authenticatedUserId = req.app.locals.userId;
  const { tweetRepository } = initRepositories(prisma, ['tweet']);

  if (!description) {
    return res.status(200).json({ message: 'description is required' });
  }

  if (!postId) {
    return res.status(200).json({ message: 'postId is required' });
  }

  try {
    const parentTweet = await tweetRepository.findOne({
      postId,
      type: {
        not: 'RETWEET'
      }
    });

    if (!parentTweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }

    let fileUrls: string[] = [];
    if (files) {
      fileUrls = await FileService.upload(files);
    }

    const data: CheckCreateReplyRequest = {
      description,
      postId,
      parentTweet,
      fileUrls,
      authenticatedUserId
    };

    req.app.locals = data;

    next();
  } catch (err) {
    next(err);
  }
};
