import { Like, Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

class LikeRepository {
  constructor(private Like: Prisma.LikeDelegate<DefaultArgs>) {}
  async findLike(postId: string, userId: string): Promise<Like | null> {
    const like = await this.Like.findFirst({
      where: {
        postId,
        userId
      }
    });
    return like;
  }
}

export default LikeRepository;
