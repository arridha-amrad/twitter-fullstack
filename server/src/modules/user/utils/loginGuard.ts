import { NextFunction, Request, Response } from "express";
import { REFRESH_TOKEN } from "../user.constants";
import prisma from "@/utils/prisma";

export const loginGuard = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const cookieToken = req.cookies[REFRESH_TOKEN];
		if (cookieToken && typeof cookieToken === "string") {
			const [type, token] = cookieToken.split(" ");
			if (type === "Bearer") {
				const storedToken = await prisma.token.findFirst({
					where: { value: token },
				});
				if (storedToken) {
					await prisma.token.delete({ where: { id: storedToken.id } });
				}
			}
		}
		next();
	} catch (error) {
		return res.status(500).send("Something went wrong");
	}
};
