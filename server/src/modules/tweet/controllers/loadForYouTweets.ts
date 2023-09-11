import { Request, Response } from 'express';
import prisma from '@/utils/prisma';
import { FetchedTweets } from '../tweet.types';
import { getEntities } from '../tweet.entities';
import { TweetWithParents } from '../repositories/TweetRepository';

const loadForYouTweets = async (req: Request, res: Response) => {
  const pageParam = req.params.page || '1';
  const page = parseInt(pageParam);
  const { tweetRepository } = getEntities(prisma, ['tweet']);
  try {
    const total = await tweetRepository.sumForYouTweets();
    const tweets = await tweetRepository.pagingTweets(page);

    const tweetsWithParents: TweetWithParents[] = [];
    for (const tweet of tweets) {
      const twp = await tweetRepository.loadWithParent(tweet);
      tweetsWithParents.push(twp);
    }
    return res.status(200).json({
      tweets: tweetsWithParents,
      currentPage: page,
      hasNextPage: total > page * 10,
      total
    } as FetchedTweets);
  } catch (err) {
    console.log('err : ', err);
    return res.status(500).send('Server Error');
  } finally {
    await prisma.$disconnect();
  }
};

export default loadForYouTweets;
