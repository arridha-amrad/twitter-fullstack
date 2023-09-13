import { Prisma } from '@prisma/client';

export type Input =
  | (Prisma.Without<Prisma.TweetCreateInput, Prisma.TweetUncheckedCreateInput> &
      Prisma.TweetUncheckedCreateInput)
  | (Prisma.Without<Prisma.TweetUncheckedCreateInput, Prisma.TweetCreateInput> &
      Prisma.TweetCreateInput);
export type RequiredDto = Required<Pick<Input, 'postId' | 'userId' | 'type'>>;
export type OptionalDto = Partial<Pick<Input, 'quotePost' | 'parentId'>>;
export type CreateTweetDto = RequiredDto & OptionalDto;
