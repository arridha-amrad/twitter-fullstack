import { Request, Response } from 'express';
import prisma from '@/prisma';
import { hash } from 'argon2';
import { toStartCase } from '@/utils/toStartCase';
import { RegisterDTO } from '@/types/user.types';

const register = async (req: Request, res: Response) => {
  const { email, username, password, firstName, lastName } =
    req.body as RegisterDTO;
  const fullname = toStartCase(`${firstName.trim()} ${lastName.trim()}`);
  try {
    const hashedPassword = await hash(password.trim());
    await prisma.user.create({
      data: {
        userStrategy: 'EMAIL',
        fullname,
        email,
        password: hashedPassword,
        username
      }
    });
    return res
      .status(200)
      .json({ message: 'Congratulations! Registration successful' });
  } catch (err: any) {
    if ((err?.meta?.target as string[]).includes('username')) {
      return res.status(400).json({ message: 'username has been registered' });
    }
    if ((err?.meta?.target as string[]).includes('email')) {
      return res.status(400).json({ message: 'email has been registered' });
    }
    return res.sendStatus(500);
  }
};

export default register;
