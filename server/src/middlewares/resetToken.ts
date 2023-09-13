import { NextFunction, Request, Response } from 'express';
import prisma from '@/prisma';
import CookieService from '@/services/CookieService';
import { initRepositories } from '@/repositories/initRepository';

export const resetToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cookieToken = req.cookies[CookieService.refreshTokenCookie];
    if (cookieToken && typeof cookieToken === 'string') {
      const [type, token] = cookieToken.split(' ');
      if (type === 'Bearer') {
        const { tokenRepository } = initRepositories(prisma, ['token']);
        const storedToken = await tokenRepository.find(token);
        if (storedToken) {
          await tokenRepository.remove(storedToken.id);
        }
      }
    }
    next();
  } catch (error) {
    return res.status(500).send('Something went wrong');
  }
};
