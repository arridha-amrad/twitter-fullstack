import { Request, Response } from "express";
import prisma from "@/utils/prisma";

const like = async (req: Request, res: Response) => {
	const { postId } = req.body;
	const userId = req.app.locals.userId;
	try {
		const post = await prisma.post.findFirst({ where: { id: postId } });
		if (!post) return res.status(404).json({ message: "Post not found" });
		const like = await prisma.like.findFirst({ where: { postId, userId } });
		let message = "";
		if (like) {
			await prisma.like.delete({
				where: { postId_userId: { postId, userId } },
			});
			message = "unLiked";
		} else {
			await prisma.like.create({
				data: {
					postId,
					userId,
				},
			});
			message = "liked";
		}
		return res.status(201).json(message);
	} catch (err) {
		console.log(err);
		return res.status(500).send("Server error");
	} finally {
		await prisma.$disconnect();
	}
};

export default like;
