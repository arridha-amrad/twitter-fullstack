import { RepostEntity } from '@/entities';
import { Prisma } from '@prisma/client';

type Create =
  | (Prisma.Without<
      Prisma.RepostCreateInput,
      Prisma.RepostUncheckedCreateInput
    > &
      Prisma.RepostUncheckedCreateInput)
  | (Prisma.Without<
      Prisma.RepostUncheckedCreateInput,
      Prisma.RepostCreateInput
    > &
      Prisma.RepostCreateInput);

class RepostRepository {
  constructor(private Repost: RepostEntity) {}

  async find(filter: Prisma.RepostWhereInput) {
    return this.Repost.findFirst({
      where: {
        ...filter
      }
    });
  }

  async create(data: Create) {
    return this.Repost.create({
      data: data
    });
  }

  async remove(filter: Prisma.RepostUserIdPostIdCompoundUniqueInput) {
    return this.Repost.delete({
      where: {
        userId_postId: filter
      }
    });
  }
}

export default RepostRepository;
