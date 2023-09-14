import { NextFunction, Request, Response } from 'express';
import FileService from '@/services/FileService';

export type CheckCreateTweetRequest = {
  description: string;
  fileUrls: string[];
  authUserId: string;
};

export const checkCreateTweetRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { description } = req.body as { description: string };
  const files = req.files?.files;
  const authUserId = req.app.locals.userId;

  if (!description || !description.trim()) {
    return res.status(200).json({ message: 'description is required' });
  }

  try {
    let fileUrls: string[] = [];

    if (files) {
      fileUrls = await FileService.upload(files);
    }

    const data: CheckCreateTweetRequest = {
      description,
      fileUrls,
      authUserId
    };

    req.app.locals = data;

    next();
  } catch (err) {
    next(err);
  }
};
