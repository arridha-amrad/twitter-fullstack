import { Request, Response } from 'express';
import prisma from '@/prisma';
import CookieService from '@/services/CookieService';
import JwtService from '@/services/JwtService';
import { initRepositories } from '@/repositories/initRepository';

const refreshToken = async (req: Request, res: Response) => {
  const bearerRefToken = req.cookies[CookieService.refreshTokenCookie];
  if (!bearerRefToken) return res.sendStatus(500);
  const jwtService = new JwtService();
  try {
    const token = bearerRefToken.split(' ')[1];
    const { userId } = await jwtService.verifyToken(token, 'RefreshToken');
    await prisma.$transaction(async (tx) => {
      const { userRepository, tokenRepository } = initRepositories(tx, [
        'user',
        'token'
      ]);
      const user = await userRepository.findById(userId);
      if (!user) return res.sendStatus(404);
      const accToken = await jwtService.create(user.id, 'AccessToken');
      const refToken = await jwtService.create(user.id, 'RefreshToken');
      const storedToken = await tokenRepository.find(token);
      if (!storedToken) throw new Error('stored token not found');
      await tokenRepository.update(storedToken.id, refToken);
      res.cookie(
        CookieService.refreshTokenCookie,
        `Bearer ${refToken}`,
        CookieService.options
      );
      return res.status(200).json({ token: accToken });
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  } finally {
    await prisma.$disconnect();
  }
};

export default refreshToken;
