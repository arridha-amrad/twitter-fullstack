import { Request, Response } from 'express';
import prisma from '@/prisma';
import { initRepositories } from '@/repositories/initRepository';

const me = async (req: Request, res: Response) => {
  const userId = req.app.locals.userId;
  const { userRepository } = initRepositories(prisma, ['user']);
  try {
    const user = await userRepository.findOne({ id: userId });
    if (!user) return res.status(404).json({ message: 'user not found' });
    const { password, ...rest } = user;
    return res.status(200).json({ user: rest });
  } catch (err) {
    console.log('err : ', err);
    return res.sendStatus(500);
  }
};

export default me;
