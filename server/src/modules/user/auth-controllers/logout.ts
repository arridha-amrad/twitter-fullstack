import { Request, Response } from "express";
import prisma from "@/utils/prisma";
import { REFRESH_TOKEN } from "../user.constants";
import { cookieOptions } from "@/utils/cookieOptions";

const logout = async (req: Request, res: Response) => {
  try {
    const bearerRefToken = req.cookies[REFRESH_TOKEN];
    if (typeof bearerRefToken === "string") {
      const [type, token] = bearerRefToken.split(" ");
      if (type === "Bearer") {
        const storedToken = await prisma.token.findFirst({
          where: { value: token },
        });
        if (storedToken) {
          await prisma.token.delete({ where: { id: storedToken.id } });
        }
      }
    }
    res.clearCookie(REFRESH_TOKEN, cookieOptions);
    return res.status(200).json({ message: "logout" });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export default logout;
