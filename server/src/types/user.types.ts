import { User, Tweet, Prisma, File } from '@prisma/client';

export type AUTHOR = Pick<User, 'id' | 'fullname' | 'username' | 'avatarUrl'>;
export type TweetWithParents = Tweet & { parents: Tweet[] };
export type POST_COUNTER = Omit<Prisma.PostCountOutputTypeSelect, 'tweets'>;
export type POST_FILE = Pick<File, 'url'>;
