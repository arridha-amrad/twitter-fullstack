import { Request, Response } from "express";
import prisma from "@/utils/prisma";
import { getTweetData } from "../tweet.constants";
import { FetchedTweets } from "../tweet.types";

const LIMIT = 10;

export default async function getMyTweetsController(
	req: Request,
	res: Response
) {
	const authenticatedUserId = req.app.locals.userId;
	const { page = "1" } = req.query as {
		page: string;
	};

	const intPage = parseInt(page);

	try {
		const total = await prisma.tweet.count({
			where: {
				userId: authenticatedUserId,
				isEnabled: true,
				parentId: null,
			},
		});
		const tweets = await prisma.tweet.findMany({
			orderBy: { createdAt: "desc" },
			take: LIMIT,
			skip: (intPage - 1) * LIMIT,
			include: getTweetData(authenticatedUserId),
			where: {
				userId: authenticatedUserId,
				isEnabled: true,
				parentId: null,
			},
		});

		return res.status(200).json({
			tweets,
			total,
			currentPage: intPage,
			hasNextPage: total > intPage * LIMIT,
		} as FetchedTweets);
	} catch (error) {
		console.log(error);
	} finally {
		await prisma.$disconnect();
	}
}
