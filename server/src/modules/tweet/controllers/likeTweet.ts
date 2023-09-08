import { Request, Response } from "express";
import prisma from "@/utils/prisma";
import { getAuthId } from "@/utils/authId";

const like = async (req: Request, res: Response) => {
  const { postId } = req.body;
  if (!postId) {
    return res.status(400).json({ message: "postId is required" });
  }
  const userId = getAuthId();
  if (!userId) {
    return res.sendStatus(401);
  }
  try {
    const message = await prisma.$transaction(async (tx) => {
      const post = await tx.post.findFirst({ where: { id: postId } });
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      const like = await tx.like.findFirst({ where: { postId, userId } });
      let message = "";
      if (like) {
        await tx.like.delete({
          where: { postId_userId: { postId, userId } },
        });
        message = "unLiked";
      } else {
        await tx.like.create({
          data: {
            postId,
            userId,
          },
        });
        message = "liked";
      }
    });

    return res.status(201).json(message);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  } finally {
    await prisma.$disconnect();
  }
};

export default like;
