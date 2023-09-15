import { Request, Response } from 'express';
import prisma from '@/prisma';
import { initRepositories } from '@/repositories/initRepository';
import { PageableTweets, TweetWithParents } from '@/types/tweet.types';
import TweetService from '@/services/TweetService';
import { TOTAL_TWEETS_LIMIT } from '@/constants/tweet.constants';

const loadForYouTweets = async (req: Request, res: Response) => {
  const pageParam = req.params.page || '1';
  const page = parseInt(pageParam);
  const { tweetRepository } = initRepositories(prisma, ['tweet']);
  try {
    const total = await tweetRepository.sumTweets();
    const tweets = await tweetRepository.pagingTweets(page);

    const tweetsWithParents: TweetWithParents[] = [];
    const tweetService = new TweetService(tweetRepository);
    for (const tweet of tweets) {
      const twp = await tweetService.loadWithParent(tweet);
      tweetsWithParents.push(twp);
    }

    const result: PageableTweets = {
      tweets: tweetsWithParents,
      currentPage: page,
      hasNextPage: total > page * TOTAL_TWEETS_LIMIT,
      total
    };

    return res.status(200).json(result);
  } catch (err) {
    console.log('err : ', err);
    return res.status(500).send('Server Error');
  } finally {
    await prisma.$disconnect();
  }
};

export default loadForYouTweets;
