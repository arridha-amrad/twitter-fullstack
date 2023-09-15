import { NextFunction, Request, Response } from 'express';
import prisma from '@/prisma';
import { initRepositories } from '@/repositories/initRepository';

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username } = req.params;
  const { userRepository } = initRepositories(prisma, ['user']);
  const authUserId = req.app.locals.userId;
  try {
    const user = await userRepository.findOne(
      { username },
      { followers: { where: { id: authUserId }, select: { id: true } } }
    );
    return res.status(200).json({ user });
  } catch (err) {
    next(err);
  } finally {
    await prisma.$disconnect();
  }
}
