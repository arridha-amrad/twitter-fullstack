import { Prisma } from '@prisma/client';

type Input =
  | (Prisma.Without<Prisma.PostCreateInput, Prisma.PostUncheckedCreateInput> &
      Prisma.PostUncheckedCreateInput)
  | (Prisma.Without<Prisma.PostUncheckedCreateInput, Prisma.PostCreateInput> &
      Prisma.PostCreateInput);

type RequiredDto = Required<Pick<Input, 'authorId' | 'body'>>;

type Optional = Partial<Pick<Input, 'quoteTweetId'>>;

export type CreatePostDto = RequiredDto & Optional;
