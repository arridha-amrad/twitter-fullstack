import prisma from '@/prisma';
import { Request, Response } from 'express';
import { TOTAL_TWEETS_LIMIT } from '../modules/tweet/constants';
import { initRepositories } from '../modules/tweet/repositories';
import { PageableTweets, TweetWithParents } from '../modules/tweet/types';

export default async function loadUserReplies(req: Request, res: Response) {
  const { username, page } = req.params;
  const intPage = parseInt(page);
  const { tweetRepository } = initRepositories(prisma, ['tweet']);
  try {
    const total = await tweetRepository.sumTweets({
      user: {
        username
      },
      parentId: {
        not: null
      }
    });

    const tweets = await tweetRepository.pagingTweets(intPage, {
      user: {
        username
      },
      parentId: {
        not: null
      }
    });

    const tweetsWithParents: TweetWithParents[] = [];
    for (const tweet of tweets) {
      const twp = await tweetRepository.loadWithParent(tweet);
      tweetsWithParents.push(twp);
    }

    const result: PageableTweets = {
      tweets,
      total,
      currentPage: intPage,
      hasNextPage: total > intPage * TOTAL_TWEETS_LIMIT
    };

    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  } finally {
    await prisma.$disconnect();
  }
}
