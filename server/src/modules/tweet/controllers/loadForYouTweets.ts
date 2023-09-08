import { Request, Response } from "express";
import prisma from "@/utils/prisma";
import { TOTAL_TWEETS_LIMIT, getTweetData } from "../tweet.constants";
import { loadParentTweet } from "../utils/loadParentTweet";
import { FetchedTweets } from "../tweet.types";
import { getAuthId } from "@/utils/authId";

const loadForYouTweets = async (req: Request, res: Response) => {
  const pageParam = req.params.page || "1";
  const page = parseInt(pageParam);

  const authenticatedUserId = getAuthId();
  try {
    const total = await prisma.tweet.count({
      where: {
        isEnabled: true,
      },
    });

    const tweets = await prisma.tweet.findMany({
      orderBy: { createdAt: "desc" },
      take: TOTAL_TWEETS_LIMIT,
      skip: (page - 1) * TOTAL_TWEETS_LIMIT,
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
      currentPage: page,
      hasNextPage: total > page * 10,
      total,
    } as FetchedTweets);
  } catch (err) {
    console.log("err : ", err);
    return res.status(500).send("Server Error");
  } finally {
    await prisma.$disconnect();
  }
};

export default loadForYouTweets;
