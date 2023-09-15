import { Prisma } from '@prisma/client';
import { PostEntity } from '../../entities';
import { CreatePostDto } from './type';
import { TOTAL_TWEETS_LIMIT, getTweetData } from '@/constants/tweet.constants';

type Filter = Prisma.PostWhereInput;

class postService {
  constructor(private Post: PostEntity, private authUserId?: string) {}

  async findOne(filter: Filter) {
    return this.Post.findFirst({
      where: filter
    });
  }

  async create(data: CreatePostDto) {
    const newPost = await this.Post.create({
      data
    });
    return newPost;
  }

  async delete(id: string) {
    return this.Post.delete({
      where: {
        id
      }
    });
  }

  async pagingPost(filter: Filter, page: number) {
    return this.Post.findMany({
      where: filter,
      orderBy: {
        createdAt: 'desc'
      },
      take: TOTAL_TWEETS_LIMIT,
      skip: (page - 1) * TOTAL_TWEETS_LIMIT
    });
  }

  async sum(filter: Filter) {
    return this.Post.count({
      where: filter
    });
  }
}

export default postService;
