import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import fs from "fs";
import { IVerifyTokenPayload, setDuration } from "./jwt";

const publicKey = fs.readFileSync("./public.pem");

export const authenticationGuard = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const [_, token] = req.headers.authorization?.split(" ") ?? ["", ""];
  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(
    token,
    publicKey,
    {
      algorithms: ["RS256"],
      maxAge: setDuration("AccessToken"),
    },
    (err, payload) => {
      if (err) {
        if (err.message === "jwt expired") {
          const files = req.files?.images;
          if (files) {
            if (files instanceof Array) {
              for (let file of files) {
                fs.unlinkSync(file.tempFilePath);
              }
            } else {
              fs.unlinkSync(files.tempFilePath);
            }
          }
          return res.status(401).send("token expired");
        } else {
          throw new Error(`Verification token failure : ${err.message}`);
        }
      }
      const { userId, type } = payload as IVerifyTokenPayload;
      if (type !== "AccessToken") {
        res.status(403).json({ error: "invalid token" });
        return;
      }
      req.app.locals.userId = userId;
      next();
    }
  );
};
