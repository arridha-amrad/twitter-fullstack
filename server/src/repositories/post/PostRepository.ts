import { PostEntity } from '../../entities';
import { CreatePostDto } from './type';

class postService {
  constructor(private Post: PostEntity) {}

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
}

export default postService;
