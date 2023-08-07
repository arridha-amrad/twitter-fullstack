import { Request, Response } from "express";
import prisma from "@/utils/prisma";
import { TWEETS_LIMIT, getTweetData } from "../tweet.constants";
import { FetchedTweets } from "../tweet.types";

const getTweetReplies = async (req: Request, res: Response) => {
	const { tweetId } = req.params;
	const authenticatedUserId = req.app.locals.userId;
	const { page = "1" } = req.query as { page: string };
	const intPage = parseInt(page);
	try {
		let tweet = await prisma.tweet.findFirst({
			where: { id: tweetId },
		});

		if (!tweet) {
			return res.status(404).json({ message: "Tweet not found" });
		}

		if (tweet.isRetweet) {
			const originalTweet = await prisma.tweet.findFirst({
				where: { postId: tweet.postId, isRetweet: false },
			});
			if (!originalTweet) {
				return res.status(404).json({ message: "Tweet not found" });
			}
			tweet = originalTweet;
		}

		const total = await prisma.tweet.count({
			where: { parentId: tweet.id, isRetweet: false },
		});

		const tweets = await prisma.tweet.findMany({
			orderBy: {
				createdAt: "desc",
			},
			where: { parentId: tweet.id, isRetweet: false },
			skip: (intPage - 1) * TWEETS_LIMIT,
			take: TWEETS_LIMIT,
			include: getTweetData(authenticatedUserId),
		});

		return res.status(200).json({
			tweets,
			currentPage: intPage,
			hasNextPage: total > intPage * TWEETS_LIMIT,
			total,
		} as FetchedTweets);
	} catch (err) {
		console.log("err : ", err);
		return res.sendStatus(500);
	} finally {
		await prisma.$disconnect();
	}
};

export default getTweetReplies;
