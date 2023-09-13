import { User, Tweet, Prisma, File, Post } from '@prisma/client';

export type PageableTweets = {
  tweets: Tweet[];
  total: number;
  currentPage: number;
  hasNextPage: boolean;
};

export type AUTHOR = Pick<User, 'id' | 'fullname' | 'username' | 'avatarUrl'>;
export type TweetWithParents = Tweet & { parents: Tweet[] };
export type POST_COUNTER = Omit<Prisma.PostCountOutputTypeSelect, 'tweets'>;
export type POST_FILE = Pick<File, 'url'>;

export type IPostWithParentsAndChildren = IPostWithParents & {
  children: IPostWithParents[];
};

export type ITweet = Tweet & {
  post: IPostWithParents;
};

export type IPostWithParents = IPost & {
  parents: IPost[];
};

export type IPost = Post & {
  author: IAuthor;
  medias: File[];
  _count: IPostCount;
  isLiked: boolean;
  isRetweet: boolean;
};

export interface IPostCount {
  children: number;
  likes: number;
  medias: number;
  tweets: number;
}

export interface IAuthor {
  email: string;
  id: string;
  username: string;
  imageURL: string;
}
