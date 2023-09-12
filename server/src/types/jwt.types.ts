export type TokenTypes = 'AccessToken' | 'LinkToken' | 'RefreshToken';
export type TokenPayload = {
  userId: string;
  type: TokenTypes;
  iat: number;
  exp: number;
};
