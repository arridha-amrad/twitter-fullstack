import { Request, Response } from 'express';
import prisma from '@/prisma';
import CookieService from '@/services/CookieService';
import { initRepositories } from '@/repositories/initRepository';

const logout = async (req: Request, res: Response) => {
  try {
    const bearerRefToken = req.cookies[CookieService.refreshTokenCookie];
    if (typeof bearerRefToken === 'string') {
      const [type, token] = bearerRefToken.split(' ');
      if (type === 'Bearer') {
        const { tokenRepository } = initRepositories(prisma, ['token']);
        const storedToken = await tokenRepository.find(token);
        if (storedToken) {
          await tokenRepository.remove(storedToken.id);
        }
      }
    }
    res.clearCookie(CookieService.refreshTokenCookie, CookieService.options);
    return res.status(200).json({ message: 'logout' });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export default logout;
