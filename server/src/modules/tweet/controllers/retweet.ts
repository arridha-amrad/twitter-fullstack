import { Request, Response } from "express";
import prisma from "@/utils/prisma";
import { getTweetData } from "../tweet.constants";
import { loadParentTweet } from "../utils/loadParentTweet";

const reTweet = async (req: Request, res: Response) => {
  const { postId } = req.body;
  const authenticatedUserId = req.app.locals.userId;

  try {
    const tweet = await prisma.tweet.findFirst({
      where: { postId, isRetweet: false },
    });

    if (!tweet) return res.sendStatus(404);

    let message = "";

    const rtByMe = await prisma.tweet.findFirst({
      where: {
        postId,
        isRetweet: true,
        userId: authenticatedUserId,
      },
    });

    if (!rtByMe) {
      await prisma.retweet.create({
        data: { postId, userId: authenticatedUserId },
      });
      await prisma.tweet.create({
        data: {
          parentId: tweet.parentId,
          isRetweet: true,
          postId,
          userId: authenticatedUserId,
        },
      });
      message = "retweeted";
    } else {
      await prisma.retweet.delete({
        where: {
          userId_postId: {
            postId,
            userId: authenticatedUserId,
          },
        },
      });
      await prisma.tweet.delete({
        where: {
          id: rtByMe.id,
        },
      });
      message = "unRetweeted";
    }

    const rtTweet = await prisma.tweet.findFirst({
      where: {
        postId,
        userId: authenticatedUserId,
        isRetweet: true,
      },
      include: { ...getTweetData(authenticatedUserId) },
    });

    if (rtTweet?.parentId) {
      await loadParentTweet(rtTweet);
    }

    return res.status(200).json({ message: message, tweet: rtTweet });
  } catch (err) {
    return res.sendStatus(500);
  }
};

export default reTweet;
