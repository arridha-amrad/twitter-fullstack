import { NextFunction, Request, Response } from 'express';
import { uploadFiles } from '../repositories/filesServices';

export type CheckCreateTweetRequest = {
  description: string;
  fileUrls: string[];
};

export const checkCreateTweetRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { description } = req.body as { description: string };
  const files = req.files?.files;

  if (!description || !description.trim()) {
    return res.status(200).json({ message: 'description is required' });
  }

  try {
    let fileUrls: string[] = [];
    if (files) {
      fileUrls = await uploadFiles(files);
    }

    const data: CheckCreateTweetRequest = {
      description,
      fileUrls
    };

    req.app.locals = data;

    next();
  } catch (err) {
    next(err);
  }
};
