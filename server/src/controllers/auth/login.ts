import { Request, Response } from 'express';
import prisma from '@/prisma';
import { verify } from 'argon2';
import JwtService from '@/services/JwtService';
import CookieService from '@/services/CookieService';

const login = async (req: Request, res: Response) => {
  const { identity, password }: { identity: string; password: string } =
    req.body;
  try {
    const user = await prisma.user.findFirst({
      where: identity.includes('@')
        ? {
            email: identity
          }
        : {
            username: identity
          }
    });
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
    await prisma.token.create({
      data: {
        name: tokenName,
        value: refreshToken,
        userId: user.id
      }
    });
    res.cookie(
      CookieService.refreshTokenCookie,
      `Bearer ${refreshToken}`,
      CookieService.options
    );
    // @ts-ignore
    const { password: pwd, ...rest } = user;
    return res.status(200).json({ token: accessToken, user: rest });
  } catch (error) {
    console.log('error : ', error);
    return res.sendStatus(500);
  } finally {
    await prisma.$disconnect();
  }
};

export default login;
