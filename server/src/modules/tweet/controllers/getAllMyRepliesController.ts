import { Request, Response } from "express";
import prisma from "@/utils/prisma";
import { getTweetData } from "../tweet.constants";
import { loadParentTweet } from "../utils/loadParentTweet";

const LIMIT = 10;

export default async function getAllMyReplies(req: Request, res: Response) {
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
				parentId: { not: null },
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
				parentId: { not: null },
			},
		});

		for (const tweet of tweets) {
			if (tweet.parentId) {
				await loadParentTweet(tweet);
			}
		}

		return res.status(200).json({
			tweets,
			total,
			currentPage: intPage,
			hasNextPage: total > intPage * LIMIT,
		});
	} catch (err) {
		console.log(err);
		return res.sendStatus(500);
	} finally {
		await prisma.$disconnect();
	}
}
