import prisma from '@/prisma';
import { initRepositories } from '@/repositories/initRepository';
import { RegisterDTO } from '@/types/user.types';
import { toStartCase } from '@/utils/toStartCase';
import { hash } from 'argon2';
import { NextFunction, Request, Response } from 'express';

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { email, username, password, firstName, lastName } =
    req.body as RegisterDTO;
  const fullname = toStartCase(`${firstName.trim()} ${lastName.trim()}`);
  const { userRepository } = initRepositories(prisma, ['user']);
  try {
    const hashedPassword = await hash(password.trim());

    await userRepository.create({
      userStrategy: 'EMAIL',
      fullname,
      email,
      password: hashedPassword,
      username
    });

    return res
      .status(201)
      .json({ message: 'Congratulations! Registration successful' });
  } catch (err) {
    next(err);
  } finally {
    await prisma.$disconnect();
  }
};

export default register;
