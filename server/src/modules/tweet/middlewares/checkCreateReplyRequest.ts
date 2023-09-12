import { NextFunction, Request, Response } from 'express';
import prisma from '@/prisma';
import { uploadFiles } from '../repositories/filesServices';
import { Tweet } from '@prisma/client';

export type CheckCreateReplyRequest = {
  description: string;
  postId: string;
  parentTweet: Tweet;
  fileUrls: string[];
};

export const checkCreateReplyRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { description, postId } = req.body;
  const files = req.files?.files;

  if (!description) {
    return res.status(200).json({ message: 'description is required' });
  }
  if (!postId) {
    return res.status(200).json({ message: 'postId is required' });
  }

  try {
    const parentTweet = await prisma.tweet.findFirst({
      where: { postId, isRetweet: false }
    });

    if (!parentTweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }

    let fileUrls: string[] = [];
    if (files) {
      fileUrls = await uploadFiles(files);
    }

    const data: CheckCreateReplyRequest = {
      description,
      postId,
      parentTweet,
      fileUrls
    };

    req.app.locals = data;

    next();
  } catch (err) {
    next(err);
  }
};
