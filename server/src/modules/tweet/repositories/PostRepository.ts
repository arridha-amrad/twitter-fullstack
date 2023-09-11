import { PostEntity } from '../tweet.entities';

export type CreatePostDto = {
  body: string;
  authorId: string;
  parentId: string;
};

class postService {
  constructor(private Post: PostEntity) {}

  async create(data: CreatePostDto) {
    const newPost = await this.Post.create({
      data: {
        ...data
      }
    });
    return newPost;
  }
}

export default postService;
