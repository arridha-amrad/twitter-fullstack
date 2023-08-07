import jwt from "jsonwebtoken";
import * as fs from "fs";

const privateKey = fs.readFileSync("./private.pem");
const publicKey = fs.readFileSync("./public.pem");

export type TokenTypes = "AccessToken" | "LinkToken" | "RefreshToken";

export interface IVerifyTokenPayload {
  userId: string;
  type: TokenTypes;
  iat: number;
  exp: number;
}

export const setDuration = (type: TokenTypes) => {
  switch (type) {
    case "AccessToken":
      return "1h";
    case "LinkToken":
      return "1d";
    default:
      return "1y";
  }
};

export const createToken = async (
  userId: string,
  type: TokenTypes
): Promise<string> => {
  const result: string = await new Promise((resolve, reject) => {
    jwt.sign(
      { userId, type },
      privateKey,
      {
        algorithm: "RS256",
        expiresIn: setDuration(type),
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
};

export const verifyToken = async (
  token: string,
  type: TokenTypes
): Promise<IVerifyTokenPayload> => {
  const result: IVerifyTokenPayload = await new Promise((resolve, reject) => {
    jwt.verify(
      token,
      publicKey,
      {
        algorithms: ["RS256"],
        maxAge: setDuration(type),
      },
      (err, payload) => {
        if (err !== null) {
          reject(new Error(err.message));
        }
        const data = payload as IVerifyTokenPayload;
        resolve(data);
      }
    );
  });
  return result;
};
