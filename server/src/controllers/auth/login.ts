import { NextFunction, Request, Response } from 'express';
import prisma from '@/prisma';
import { verify } from 'argon2';
import JwtService from '@/services/JwtService';
import CookieService from '@/services/CookieService';
import { initRepositories } from '@/repositories/initRepository';

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { identity, password }: { identity: string; password: string } =
    req.body;
  try {
    await prisma.$transaction(async (tx) => {
      const { userRepository, tokenRepository } = initRepositories(tx, [
        'user',
        'token'
      ]);
      const user = await userRepository.findOne(
        identity.includes('@')
          ? {
              email: identity
            }
          : {
              username: identity
            }
      );
      if (!user) {
        return res.status(404).json({ message: 'user not found' });
      }
      const isMatch = await verify(user.password, password);
      if (!isMatch) {
        return res.status(400).json({ message: 'invalid email and password' });
      }
      const jwtService = new JwtService();
      const accessToken = await jwtService.create(user.id, 'AccessToken');
      const refreshToken = await jwtService.create(user.id, 'RefreshToken');
      const tokenName = req.headers['user-agent'] ?? 'myToken';
      await tokenRepository.create(tokenName, refreshToken, user.id);
      res.cookie(
        CookieService.refreshTokenCookie,
        `Bearer ${refreshToken}`,
        CookieService.options
      );
      // @ts-ignore
      const { password: pwd, userStrategy, ...rest } = user;
      return res.status(200).json({ token: accessToken, user: rest });
    });
  } catch (error) {
    next(error);
  } finally {
    await prisma.$disconnect();
  }
};

export default login;
