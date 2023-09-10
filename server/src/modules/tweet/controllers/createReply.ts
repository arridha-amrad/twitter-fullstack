import { Request, Response } from "express";
import prisma from "@/utils/prisma";
import { getTweetData } from "../tweet.constants";
import { loadParentTweet } from "../utils/loadParentTweet";
import { CheckReplyRequest } from "../middlewares/checkReplyRequest";

const createReply = async (req: Request, res: Response) => {
  try {
    const { description, fileUrls, parentTweet, postId, authenticatedUserId } =
      req.app.locals as CheckReplyRequest;

    const newTweet = await prisma.$transaction(async (tx) => {
      const newPost = await tx.post.create({
        data: {
          body: description,
          authorId: authenticatedUserId,
          parentId: postId,
        },
      });
      const newTweet = await tx.tweet.create({
        data: {
          postId: newPost.id,
          userId: authenticatedUserId,
          parentId: parentTweet.id,
          isRetweet: false,
        },
        include: getTweetData(authenticatedUserId),
      });
      await tx.file.createMany({
        data: fileUrls.map((url) => ({
          postId: newPost.id,
          url,
          userId: authenticatedUserId,
        })),
      });
      if (newTweet.parentId) {
        await loadParentTweet(newTweet);
      }
      return newTweet;
    });

    return res.status(201).json({ reply: newTweet });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error");
  } finally {
    await prisma.$disconnect();
  }
};

export default createReply;
