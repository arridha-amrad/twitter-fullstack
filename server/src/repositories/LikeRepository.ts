import { LikeEntity } from '@/entities';
import { Like } from '@prisma/client';

class LikeRepository {
  constructor(private Like: LikeEntity) {}
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
