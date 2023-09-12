import { createToken, verifyToken } from '@/utils/jwt';
import { Request, Response } from 'express';
import prisma from '@/prisma';
import { cookieOptions } from '@/utils/cookieOptions';
import { REFRESH_TOKEN } from '../user.constants';

const refreshToken = async (req: Request, res: Response) => {
  const bearerRefToken = req.cookies[REFRESH_TOKEN];
  if (!bearerRefToken) return res.sendStatus(500);
  try {
    const token = bearerRefToken.split(' ')[1];
    const { userId } = await verifyToken(token, 'RefreshToken');
    const user = await prisma.user.findFirst({ where: { id: userId } });
    if (!user) return res.sendStatus(404);
    const accToken = await createToken(user.id, 'AccessToken');
    const refToken = await createToken(user.id, 'RefreshToken');
    const storedToken = await prisma.token.findFirst({
      where: { value: token }
    });
    if (!storedToken) throw new Error('stored token not found');
    await prisma.token.update({
      data: {
        value: refToken
      },
      where: {
        id: storedToken.id
      }
    });
    res.cookie(REFRESH_TOKEN, `Bearer ${refToken}`, cookieOptions);
    return res.status(200).json({ token: accToken });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export default refreshToken;
