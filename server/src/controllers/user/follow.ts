import { NextFunction, Request, Response } from 'express';
import prisma from '@/prisma';
import { initRepositories } from '@/repositories/initRepository';
import { User } from '@prisma/client';

export default async function follow(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userId } = req.body;
  const authUserId = req.app.locals.userId;
  try {
    let message = '';
    var user!: User;
    await prisma.$transaction(async (tx) => {
      const { userRepository } = initRepositories(tx, ['user']);
      const isFollow = await tx.user.findFirst({
        where: {
          id: authUserId,
          followings: { some: { id: userId } }
        }
      });
      if (isFollow) {
        user = await userRepository.update(
          { id: authUserId },
          { followings: { disconnect: { id: userId } } }
        );
        message = 'unFollow';
      } else {
        user = await userRepository.update(
          { id: authUserId },
          { followings: { connect: { id: userId } } }
        );
        message = 'follow';
      }
    });
    const { password, ...rest } = user;
    return res.status(200).json({ message, user: rest });
  } catch (err) {
    next(err);
  } finally {
    await prisma.$disconnect();
  }
}
