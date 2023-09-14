import { TOTAL_TWEETS_LIMIT } from '@/constants/tweet.constants';
import prisma from '@/prisma';
import { initRepositories } from '@/repositories/initRepository';
import { PageableTweets } from '@/types/tweet.types';
import { Request, Response } from 'express';

const loadReplies = async (req: Request, res: Response) => {
  const { postId, page } = req.params;
  const authenticatedUserId = req.app.locals.userId;
  const intPage = parseInt(page);
  const { tweetRepository } = initRepositories(
    prisma,
    ['tweet'],
    authenticatedUserId
  );
  try {
    const tweets = await tweetRepository.loadReplies(postId, intPage);
    const total = await tweetRepository.sumTweets({ replyPostId: postId });

    const result: PageableTweets = {
      tweets,
      currentPage: intPage,
      hasNextPage: total > intPage * TOTAL_TWEETS_LIMIT,
      total
    };

    return res.status(200).json(result);
  } catch (err) {
    console.log('err : ', err);
    return res.sendStatus(500);
  } finally {
    await prisma.$disconnect();
  }
};

export default loadReplies;
