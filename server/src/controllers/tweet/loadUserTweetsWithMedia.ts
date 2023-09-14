import { NextFunction, Request, Response } from 'express';
import prisma from '@/prisma';

const loadUserTweetsWithMedia = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (err) {
    next(err);
  } finally {
    await prisma.$disconnect();
  }
};

export default loadUserTweetsWithMedia;
