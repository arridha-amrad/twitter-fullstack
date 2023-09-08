import { Request, Response } from "express";
import prisma from "@/utils/prisma";
import { TOTAL_TWEETS_LIMIT, getTweetData } from "../tweet.constants";
import { FetchedTweets } from "../tweet.types";
import { getAuthId } from "@/utils/authId";

export default async function loadUserTweets(req: Request, res: Response) {
  const authenticatedUserId = getAuthId();
  const { username, page } = req.params;

  const intPage = parseInt(page);

  try {
    const total = await prisma.tweet.count({
      where: {
        user: {
          username,
        },
        isEnabled: true,
        parentId: null,
      },
    });
    const tweets = await prisma.tweet.findMany({
      orderBy: { createdAt: "desc" },
      take: TOTAL_TWEETS_LIMIT,
      skip: (intPage - 1) * TOTAL_TWEETS_LIMIT,
      include: getTweetData(authenticatedUserId),
      where: {
        user: { username },
        isEnabled: true,
        parentId: null,
      },
    });

    return res.status(200).json({
      tweets,
      total,
      currentPage: intPage,
      hasNextPage: total > intPage * TOTAL_TWEETS_LIMIT,
    } as FetchedTweets);
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}
