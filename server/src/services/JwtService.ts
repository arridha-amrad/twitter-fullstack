import { TokenPayload, TokenTypes } from '@/types/jwt.types';
import jwt from 'jsonwebtoken';
import FileSystemService from './FileSystemService';

class JwtService {
  private privateKey: Buffer;
  private publicKey: Buffer;
  constructor() {
    this.privateKey = FileSystemService.getPrivateKey();
    this.publicKey = FileSystemService.getPublicKey();
  }

  private setDuration(type: TokenTypes) {
    switch (type) {
      case 'AccessToken':
        return '1h';
      case 'LinkToken':
        return '1d';
      default:
        return '1y';
    }
  }

  async create(userId: string, type: TokenTypes) {
    const result: string = await new Promise((resolve, reject) => {
      jwt.sign(
        { userId, type },
        this.privateKey,
        {
          algorithm: 'RS256',
          expiresIn: this.setDuration(type)
        },
        (err, token) => {
          if (err !== null) {
            reject(new Error(`Failure on creating token : ${err.message}`));
          }
          resolve(token as string);
        }
      );
    });
    return result;
  }

  async verifyToken(token: string, type: TokenTypes) {
    const result: TokenPayload = await new Promise((resolve, reject) => {
      jwt.verify(
        token,
        this.publicKey,
        {
          algorithms: ['RS256'],
          maxAge: this.setDuration(type)
        },
        (err, payload) => {
          if (err !== null) {
            reject(new Error(err.message));
          }
          resolve(payload as TokenPayload);
        }
      );
    });
    return result;
  }
}

export default JwtService;
