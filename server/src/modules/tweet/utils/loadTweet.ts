import prisma from '@/utils/prisma';
import { getTweetData } from '../constants';

export const loadTweet = async (
  tweetId: string,
  authenticatedUserId: string = ''
) => {
  try {
    return prisma.tweet.findFirst({
      where: { id: tweetId },
      include: { ...getTweetData(authenticatedUserId) }
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};
