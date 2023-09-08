import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../../utils/jwt";
import removeIncomingFiles from "../../utils/removeIncomingFiles";
import { setAuthId } from "../../utils/authId";

const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const [_, token] = req.headers.authorization?.split(" ") ?? ["", ""];
  if (!token) {
    return res.sendStatus(401);
  }
  try {
    const { userId, type } = await verifyToken(token, "AccessToken");
    if (type !== "AccessToken") {
      return res.status(403).json({ error: "invalid token" });
    }
    setAuthId(userId);
    next();
  } catch (error: any) {
    if (error.message === "jwt expired") {
      const files = req.files?.files;
      if (files) {
        removeIncomingFiles(files);
      }
      return res.status(401).send("token expired");
    }
    throw new Error(`Verification token failure : ${error.message}`);
  }
};

export default isAuthenticated;
