type Author = Pick<User, 'id' | 'fullname' | 'imageURL' | 'username'>;

type PostCounter = {
  files: number;
  likes: number;
  retweets: number;
  children: number;
};

type PostLike = {
  userId: string;
};

type PostFile = {
  url: string;
};

type PostRetweet = {
  userId: string;
};

type Post = {
  id: string;
  body: string;
  authorId: string;
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
  likes: PostLike[];
  author: Author;
  files: PostFile[];
  retweets: PostRetweet[];
  _count: PostCounter;
};

type Tweet = {
  id: string;
  isEnabled: boolean;
  parentId: null | string;
  postId: string;
  userId: string;
  isRetweet: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: Author;
  post: Post;
  parent?: Tweet;
  children: Tweet[];
};

type TweetWithParents = Tweet & { parents: Tweet[] };
