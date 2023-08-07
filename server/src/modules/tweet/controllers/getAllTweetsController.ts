import { Request, Response } from "express";
import prisma from "@/utils/prisma";
import { getTweetData } from "../tweet.constants";
import { loadParentTweet } from "../utils/loadParentTweet";
import { FetchedTweets } from "../tweet.types";

const LIMIT = 10;

const loadTweets = async (req: Request, res: Response) => {
	const { page = "1" } = req.query as {
		page: string;
	};
	const authenticatedUserId = req.app.locals.userId;
	const intPage = parseInt(page);
	try {
		const total = await prisma.tweet.count({
			where: {
				isEnabled: true,
			},
		});

		const tweets = await prisma.tweet.findMany({
			orderBy: { createdAt: "desc" },
			take: LIMIT,
			skip: (intPage - 1) * LIMIT,
			include: getTweetData(authenticatedUserId),
			where: {
				isEnabled: true,
			},
		});

		for (const tweet of tweets) {
			if (tweet.parentId) {
				await loadParentTweet(tweet);
			}
		}

		return res.status(200).json({
			tweets,
			currentPage: intPage,
			hasNextPage: total > intPage * 10,
			total,
		} as FetchedTweets);
	} catch (err) {
		console.log("err : ", err);
		return res.status(500).send("Server Error");
	} finally {
		await prisma.$disconnect();
	}
};

export default loadTweets;
