import { TOTAL_TWEETS_LIMIT } from '@/constants/tweet.constants';
import prisma from '@/prisma';
import { initRepositories } from '@/repositories/initRepository';
import { PageableTweets } from '@/types/tweet.types';
import { Request, Response } from 'express';

export default async function loadUserTweets(req: Request, res: Response) {
  const { username, page } = req.params;
  const intPage = parseInt(page);
  const { tweetRepository } = initRepositories(prisma, ['tweet']);
  try {
    const total = await tweetRepository.sumTweets({
      user: {
        username
      },
      type: {
        not: 'REPLY'
      }
    });

    const tweets = await tweetRepository.pagingTweets(intPage, {
      user: {
        username
      },
      type: {
        not: 'REPLY'
      }
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
