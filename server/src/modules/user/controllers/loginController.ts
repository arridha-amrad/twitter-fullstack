import { Request, Response } from "express";
import prisma from "@/utils/prisma";
import { verify } from "argon2";
import { createToken } from "@/utils/jwt";
import { cookieOptions } from "@/utils/cookieOptions";
import { REFRESH_TOKEN } from "../user.constants";

const login = async (req: Request, res: Response) => {
	const { identity, password }: { identity: string; password: string } =
		req.body;
	try {
		const user = await prisma.user.findFirst({
			where: identity.includes("@")
				? {
						email: identity,
				  }
				: {
						username: identity,
				  },
		});
		if (!user) return res.status(404).json({ message: "user not found" });
		const isMatch = await verify(user.password, password);
		if (!isMatch) return res.status(400).json({ message: "invalid password" });
		const accessToken = await createToken(user.id, "AccessToken");
		const refreshToken = await createToken(user.id, "RefreshToken");
		await prisma.token.create({
			data: {
				value: refreshToken,
				userId: user.id,
			},
		});
		res.cookie(REFRESH_TOKEN, `Bearer ${refreshToken}`, cookieOptions);
		// @ts-ignore
		const { password: pwd, ...rest } = user;
		return res.status(200).json({ token: accessToken, user: rest });
	} catch (error) {
		console.log("error : ", error);
		return res.sendStatus(500);
	}
};

export default login;
