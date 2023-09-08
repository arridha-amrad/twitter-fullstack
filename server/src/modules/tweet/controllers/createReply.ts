import { Request, Response } from "express";
import prisma from "@/utils/prisma";
import { saveFiles } from "../services/filesServices";
import { getTweetData } from "../tweet.constants";
import { loadParentTweet } from "../utils/loadParentTweet";

const createReply = async (req: Request, res: Response) => {
  const { description, postId } = req.body;
  const authenticatedUserId = req.app.locals.userId;
  const files = req.files?.files;
  try {
    const parentTweet = await prisma.tweet.findFirst({
      where: { postId, isRetweet: false },
    });

    if (!parentTweet) {
      return res.status(404).json({ message: "Tweet not found" });
    }

    const newPost = await prisma.post.create({
      data: {
        body: description,
        authorId: authenticatedUserId,
        parentId: postId,
      },
    });

    if (files) {
      await saveFiles(authenticatedUserId, newPost.id, files);
    }

    const newTweet = await prisma.tweet.create({
      data: {
        postId: newPost.id,
        userId: authenticatedUserId,
        parentId: parentTweet.id,
        isRetweet: false,
      },
      include: getTweetData(authenticatedUserId),
    });

    if (newTweet.parentId) {
      await loadParentTweet(newTweet);
    }

    return res.status(201).json({ reply: newTweet });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error");
  } finally {
    await prisma.$disconnect();
  }
};

export default createReply;
