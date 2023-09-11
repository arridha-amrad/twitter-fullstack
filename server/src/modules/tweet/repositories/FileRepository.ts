import { FileEntity } from '../tweet.entities';

export type CreateFileDto = {
  postId: string;
  userId: string;
  urls: string[];
};

class FileRepository {
  constructor(private File: FileEntity) {}

  async createMany(data: CreateFileDto) {
    const { postId, urls, userId } = data;
    return this.File.createMany({
      data: urls.map((url) => ({
        postId,
        url,
        userId
      }))
    });
  }
}

export default FileRepository;
