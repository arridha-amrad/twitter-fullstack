import { NextFunction, Request, Response } from "express";
import { verifyToken } from "@/utils/jwt";
import { setAuthId } from "@/utils/authId";

const optionalAuthenticated = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  let authenticatedUserId = "";
  try {
    const bearerAuthToken = req.headers.authorization;
    if (!bearerAuthToken) return;
    const [type, token] = bearerAuthToken.split(" ");
    if (type !== "Bearer") return;
    const { type: verifyType, userId } = await verifyToken(
      token,
      "AccessToken"
    );
    if (verifyType !== "AccessToken") return;
    setAuthId(userId);
  } catch (error: any) {
    throw new Error(`Optional Authenticated Error : ${error}`);
  } finally {
    req.app.locals.userId = authenticatedUserId;
    next();
  }
};

export default optionalAuthenticated;
