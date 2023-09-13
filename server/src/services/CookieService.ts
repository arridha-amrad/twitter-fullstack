import { CookieOptions } from 'express';

class CookieService {
  static options: CookieOptions = {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  };

  static refreshTokenCookie = 'REFRESH_TOKEN';
}

export default CookieService;
