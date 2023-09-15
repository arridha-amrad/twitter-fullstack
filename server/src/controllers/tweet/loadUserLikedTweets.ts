import { NextFunction, Request, Response } from 'express';
import prisma from '@/prisma';
import { initRepositories } from '@/repositories/initRepository';
import { PageableTweets, TweetWithParents } from '@/types/tweet.types';
import TweetService from '@/services/TweetService';
import { TOTAL_TWEETS_LIMIT } from '@/constants/tweet.constants';

const loadUserLikedTweets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authenticatedUserId = req.app.locals.userId;
  const { username, page } = req.params;
  const intPage = parseInt(page);
  const { tweetRepository, userRepository, likeRepository, postRepository } =
    initRepositories(
      prisma,
      ['tweet', 'user', 'like', 'post'],
      authenticatedUserId
    );
  try {
    const user = await userRepository.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }

    const total = await postRepository.sum({
      likes: { some: { userId: user.id } }
    });

    const posts = await postRepository.pagingPost(
      {
        likes: { some: { userId: user.id } }
      },
      intPage
    );

    const tweetService = new TweetService(tweetRepository);

    const tweetsWithParents: TweetWithParents[] = [];
    for (const post of posts) {
      const tweet = await tweetRepository.findOne(
        {
          postId: post.id,
          type: { not: 'RETWEET' }
        },
        true
      );
      if (!tweet) {
        continue;
      }
      const twp = await tweetService.loadWithParent(tweet);
      tweetsWithParents.push(twp);
    }
    const data: PageableTweets = {
      currentPage: intPage,
      hasNextPage: total > intPage * TOTAL_TWEETS_LIMIT,
      total,
      tweets: tweetsWithParents
    };
    return res.status(200).json(data);
  } catch (err) {
    next(err);
  } finally {
    await prisma.$disconnect();
  }
};

export default loadUserLikedTweets;
