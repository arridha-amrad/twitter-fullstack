import { File, Prisma, User } from "@prisma/client";

type AUTHOR = Pick<User, "id" | "fullname" | "username" | "imageURL">;

type POST_COUNTER = Omit<Prisma.PostCountOutputTypeSelect, "tweets">;

type POST_FILE = Pick<File, "url">;

export const AUTHOR_SELECTED_DATA: Record<keyof AUTHOR, boolean> = {
  fullname: true,
  id: true,
  imageURL: true,
  username: true,
};

export const POST_COUNT_SELECTED_DATA: Record<keyof POST_COUNTER, boolean> = {
  files: true,
  likes: true,
  children: true,
  retweets: true,
};

export const POST_FILE_SELECTED_DATA: Record<keyof POST_FILE, boolean> = {
  url: true,
};

export const getPostData = (
  authenticatedUserId?: string
): Prisma.PostInclude => ({
  likes: {
    where: {
      userId: authenticatedUserId,
    },
    select: {
      userId: true,
    },
  },
  retweets: {
    where: {
      userId: authenticatedUserId,
    },
    select: {
      userId: true,
    },
  },
  _count: {
    select: POST_COUNT_SELECTED_DATA,
  },
  author: {
    select: AUTHOR_SELECTED_DATA,
  },
  files: {
    select: POST_FILE_SELECTED_DATA,
  },
});

export const getTweetData = (
  authenticatedUserId?: string
): Prisma.TweetInclude => ({
  user: {
    select: AUTHOR_SELECTED_DATA,
  },
  post: {
    include: getPostData(authenticatedUserId),
  },
});

export const TOTAL_TWEETS_LIMIT = 10;
