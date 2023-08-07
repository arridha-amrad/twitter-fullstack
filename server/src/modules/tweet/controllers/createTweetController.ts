import prisma from "@/utils/prisma";
import { Request, Response } from "express";
import { saveFiles } from "../services/filesServices";
import { getTweetData } from "../tweet.constants";

const createPost = async (req: Request, res: Response) => {
	const postDescription = req.body.description;
	const files = req.files?.files;
	const authenticatedUserId = req.app.locals.userId;

	try {
		const newPost = await prisma.post.create({
			data: {
				body: postDescription,
				authorId: authenticatedUserId,
			},
		});

		if (files) {
			await saveFiles(authenticatedUserId, newPost.id, files);
		}

		const newTweet = await prisma.tweet.create({
			data: {
				isRetweet: false,
				userId: authenticatedUserId,
				postId: newPost.id,
			},
			include: getTweetData(authenticatedUserId),
		});

		return res.status(201).json({ tweet: newTweet });
	} catch (err) {
		console.log("err : ", err);
		return res.sendStatus(500);
	} finally {
		await prisma.$disconnect();
	}
};

export default createPost;
