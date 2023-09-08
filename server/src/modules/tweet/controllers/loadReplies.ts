import { Request, Response } from "express";
import prisma from "@/utils/prisma";
import { TOTAL_TWEETS_LIMIT, getTweetData } from "../tweet.constants";
import { FetchedTweets } from "../tweet.types";

const loadReplies = async (req: Request, res: Response) => {
  const { tweetId, page } = req.params;
  const authenticatedUserId = req.app.locals.userId;
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
      skip: (intPage - 1) * TOTAL_TWEETS_LIMIT,
      take: TOTAL_TWEETS_LIMIT,
      include: getTweetData(authenticatedUserId),
    });

    return res.status(200).json({
      tweets,
      currentPage: intPage,
      hasNextPage: total > intPage * TOTAL_TWEETS_LIMIT,
      total,
    } as FetchedTweets);
  } catch (err) {
    console.log("err : ", err);
    return res.sendStatus(500);
  } finally {
    await prisma.$disconnect();
  }
};

export default loadReplies;
