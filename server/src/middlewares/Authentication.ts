import FileSystemService from '@/services/FileSystemService';
import JwtService from '@/services/JwtService';
import { NextFunction, Request, Response } from 'express';

class Authentication {
  private static getToken(req: Request) {
    const [bearer, token] = req.headers.authorization?.split(' ') ?? ['', ''];
    return {
      bearer,
      token
    };
  }
  static async require(req: Request, res: Response, next: NextFunction) {
    const { bearer, token } = this.getToken(req);
    if (bearer !== 'Bearer' || !token) {
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
    try {
      const jwtService = new JwtService();
      const { bearer, token } = this.getToken(req);
      if (bearer !== 'Bearer' || !token) return;
      const { type, userId } = await jwtService.verifyToken(
        token,
        'AccessToken'
      );
      if (type !== 'AccessToken') return;
      req.app.locals = {
        userId
      };
    } catch (error: any) {
      throw new Error(`Optional Authenticated Error : ${error}`);
    } finally {
      next();
    }
  }
}

export default Authentication;
