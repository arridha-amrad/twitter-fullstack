import { Request, Response } from "express";
import prisma from "@/utils/prisma";

export const searchUser = async (req: Request, res: Response) => {
	const search = (req.query.search as string | undefined) ?? "";
	try {
		const users = await prisma.user.findMany({
			where: {
				OR: [
					{ username: { contains: search } },
					{ fullname: { contains: search } },
				],
			},
			select: {
				email: true,
				username: true,
				id: true,
				fullname: true,
				imageURL: true,
			},
		});
		return res.status(200).json(users);
	} catch (error) {
		return res.sendStatus(500);
	}
};
