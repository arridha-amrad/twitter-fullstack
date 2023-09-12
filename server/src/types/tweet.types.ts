import { Tweet } from '@prisma/client';

export type PageableTweets = {
  tweets: Tweet[];
  total: number;
  currentPage: number;
  hasNextPage: boolean;
};
