import prisma from '@/utils/prisma';
import { Request, Response } from 'express';
import { TOTAL_TWEETS_LIMIT } from '../constants';
import { initRepositories } from '../repositories';
import { PageableTweets } from '../types';

export default async function loadUserTweets(req: Request, res: Response) {
  const { username, page } = req.params;
  const intPage = parseInt(page);
  const { tweetRepository } = initRepositories(prisma, ['tweet']);
  try {
    const total = await tweetRepository.sumTweets({
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

    const result: PageableTweets = {
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
