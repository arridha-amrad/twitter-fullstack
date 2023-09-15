import { FileEntity } from '@/entities';
import { CreateFileDto } from './type';
import { Prisma } from '@prisma/client';

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

  async sum(filter: Prisma.FileWhereInput) {
    return this.File.count({
      where: filter
    });
  }
}

export default FileRepository;
