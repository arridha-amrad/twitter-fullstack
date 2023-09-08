import { Request, Response } from "express";
import prisma from "@/utils/prisma";
import { deleteImage } from "@/utils/cloudinary";
const deleteTweet = async (req: Request, res: Response) => {
	const { tweetId } = req.params;
	const userId = req.app.locals.userId;
	try {
		const tweet = await prisma.tweet.findFirst({
			where: { id: tweetId },
			include: {
				post: {
					include: {
						files: {
							select: { url: true },
						},
					},
				},
			},
		});
		if (!tweet) return res.status(404).json({ error: "Tweet not found" });
		if (tweet.userId !== userId)
			return res.status(400).json({ message: "You are not authorized" });
		if (!tweet.isRetweet) {
			const files = tweet.post?.files;
			if (files && files.length > 0) {
				for (const file of files) {
					await deleteImage(file.url);
				}
			}
		}

		await prisma.tweet.update({
			where: { id: tweet.id },
			data: { isEnabled: false },
		});

		return res.status(200).json({ message: "Tweet deleted" });
	} catch (err) {
		console.log(err);
		return res.sendStatus(500);
	} finally {
		await prisma.$disconnect();
	}
};

export default deleteTweet;
