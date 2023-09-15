import FileSystemService from '@/services/FileSystemService';
import JwtService from '@/services/JwtService';
import { NextFunction, Request, Response } from 'express';

class Authentication {
  static async required(req: Request, res: Response, next: NextFunction) {
    const [type, token] = req.headers.authorization?.split(' ') ?? ['', ''];
    if (type !== 'Bearer' || !token) {
      return res.sendStatus(401);
    }
    try {
      const jwtService = new JwtService();
      const { userId, type } = await jwtService.verifyToken(
        token,
        'AccessToken'
      );
      if (type !== 'AccessToken') {
        return res.status(401).json({ error: 'invalid token' });
      }
      req.app.locals = {
        userId
      };
      next();
    } catch (error: any) {
      if (error.message === 'jwt expired') {
        const files = req.files?.files;
        if (files) {
          FileSystemService.removeIncomingFiles(files);
        }
        return res.status(401).send('token expired');
      }
      throw new Error(`Verification token failure : ${error.message}`);
    }
  }

  static async optional(req: Request, _: Response, next: NextFunction) {
    let authUserId = '';
    try {
      const jwtService = new JwtService();
      const [bearer, token] = req.headers.authorization?.split(' ') ?? ['', ''];
      if (bearer !== 'Bearer' || !token) return;
      const { type, userId } = await jwtService.verifyToken(
        token,
        'AccessToken'
      );
      if (type !== 'AccessToken') return;
      authUserId = userId;
    } catch (error: any) {
      return;
    } finally {
      next();
      req.app.locals = {
        userId: authUserId
      };
    }
  }
}

export default Authentication;
