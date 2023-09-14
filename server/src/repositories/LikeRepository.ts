import { LikeEntity } from '@/entities';
import { Prisma } from '@prisma/client';

type Create =
  | (Prisma.Without<Prisma.LikeCreateInput, Prisma.LikeUncheckedCreateInput> &
      Prisma.LikeUncheckedCreateInput)
  | (Prisma.Without<Prisma.LikeUncheckedCreateInput, Prisma.LikeCreateInput> &
      Prisma.LikeCreateInput);

class LikeRepository {
  constructor(private Like: LikeEntity) {}

  async findOne(filter: Prisma.LikeWhereInput) {
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
}

export default LikeRepository;
