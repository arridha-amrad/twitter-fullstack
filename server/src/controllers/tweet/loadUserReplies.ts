import { TOTAL_TWEETS_LIMIT } from '@/constants/tweet.constants';
import prisma from '@/prisma';
import { initRepositories } from '@/repositories/initRepository';
import TweetService from '@/services/TweetService';
import { PageableTweets, TweetWithParents } from '@/types/tweet.types';
import { Request, Response } from 'express';

export default async function loadUserReplies(req: Request, res: Response) {
  const { username, page } = req.params;
  const authUserId = req.app.locals.userId as string | undefined;
  const intPage = parseInt(page);
  const { tweetRepository } = initRepositories(prisma, ['tweet'], authUserId);
  try {
    const total = await tweetRepository.sumTweets({
      type: 'REPLY',
      user: {
        username
      }
    });

    const tweets = await tweetRepository.pagingTweets(intPage, {
      user: {
        username
      },
      type: {
        equals: 'REPLY'
      }
    });

    const tweetsWithParents: TweetWithParents[] = [];
    const tweetService = new TweetService(tweetRepository);
    for (const tweet of tweets) {
      const twp = await tweetService.loadWithParent(tweet);
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
