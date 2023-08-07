import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import fs from "fs";

export const optionalProtected = async (
	req: Request,
	_: Response,
	next: NextFunction
) => {
	let authenticatedUserId = "";
	const publicKey = fs.readFileSync("./public.pem");
	try {
		const bearerAuthToken = req.headers.authorization;
		if (!bearerAuthToken) return;
		const [type, token] = bearerAuthToken.split(" ");
		if (type !== "Bearer") return;
		jwt.verify(
			token,
			publicKey,
			{ maxAge: "1h", algorithms: ["RS256"] },
			(err, payload: any) => {
				if (err) return;
				authenticatedUserId = payload.userId;
			}
		);
	} catch (error) {
	} finally {
		req.app.locals.userId = authenticatedUserId;
		next();
	}
};
