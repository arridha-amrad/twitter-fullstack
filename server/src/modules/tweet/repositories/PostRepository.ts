import { getAuthId } from '@/utils/authId';
import { PostEntity } from '../entities';

export type CreatePostDto = {
  body: string;
  authorId: string;
  parentId?: string;
};

class postService {
  private authUserId;
  constructor(private Post: PostEntity) {
    this.authUserId = getAuthId();
  }

  async create(data: CreatePostDto) {
    const newPost = await this.Post.create({
      data: {
        ...data
      }
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
}

export default postService;
