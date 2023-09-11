import prisma from '@/utils/prisma';
import { Request, Response } from 'express';
import { TOTAL_TWEETS_LIMIT } from '../tweet.constants';
import { getEntities } from '../tweet.entities';
import { FetchedTweets } from '../tweet.types';

export default async function loadUserTweets(req: Request, res: Response) {
  const { username, page } = req.params;
  const intPage = parseInt(page);
  const { tweetRepository } = getEntities(prisma, ['tweet']);
  try {
    const total = await tweetRepository.sumForYouTweets({
      user: {
        username
      },
      parentId: null
    });

    const tweets = await tweetRepository.pagingTweets(intPage, {
      user: {
        username
      },
      parentId: null
    });

    const result: FetchedTweets = {
      tweets,
      total,
      currentPage: intPage,
      hasNextPage: total > intPage * TOTAL_TWEETS_LIMIT
    };

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}
