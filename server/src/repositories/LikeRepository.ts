import { TOTAL_TWEETS_LIMIT } from '@/constants/tweet.constants';
import { LikeEntity } from '@/entities';
import { Prisma } from '@prisma/client';

type Create =
  | (Prisma.Without<Prisma.LikeCreateInput, Prisma.LikeUncheckedCreateInput> &
      Prisma.LikeUncheckedCreateInput)
  | (Prisma.Without<Prisma.LikeUncheckedCreateInput, Prisma.LikeCreateInput> &
      Prisma.LikeCreateInput);

type Filter = Prisma.LikeWhereInput;

class LikeRepository {
  constructor(private Like: LikeEntity) {}

  async findMany(filter: Filter, page: number) {
    return this.Like.findMany({
      where: filter,
      orderBy: {
        createdAt: 'desc'
      },
      skip: (page - 1) * TOTAL_TWEETS_LIMIT,
      take: TOTAL_TWEETS_LIMIT
    });
  }

  async findOne(filter: Filter) {
    return this.Like.findFirst({
      where: filter
    });
  }

  async create(data: Create) {
    return this.Like.create({
      data
    });
  }

  async remove(filter: Prisma.LikePostIdUserIdCompoundUniqueInput) {
    return this.Like.delete({
      where: {
        postId_userId: filter
      }
    });
  }

  async sum(filter: Filter) {
    return this.Like.count({ where: filter });
  }
}

export default LikeRepository;
