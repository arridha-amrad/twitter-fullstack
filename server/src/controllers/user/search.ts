import { NextFunction, Request, Response } from 'express';
import prisma from '@/prisma';
import { initRepositories } from '@/repositories/initRepository';

const search = async (req: Request, res: Response, next: NextFunction) => {
  const search = (req.query.search as string | undefined) ?? '';
  const { userRepository } = initRepositories(prisma, ['user']);
  try {
    const users = await userRepository.findMany({
      OR: [
        { username: { contains: search } },
        { fullname: { contains: search } }
      ]
    });
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  } finally {
    await prisma.$disconnect();
  }
};

export default search;
