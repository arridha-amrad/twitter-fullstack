import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { Entities } from './entities';
import FileRepository from './repositories/FileRepository';
import PostRepository from './repositories/PostRepository';
import TweetRepository from './repositories/TweetRepository';

type DbClient = Omit<
  PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;

export const initRepositories = (tx: DbClient, entities: Entities[]) => {
  var fileRepository!: FileRepository;
  var postRepository!: PostRepository;
  var tweetRepository!: TweetRepository;

  for (const entity of entities) {
    switch (entity) {
      case 'file':
        fileRepository = new FileRepository(tx['file']);
        break;
      case 'tweet':
        tweetRepository = new TweetRepository(tx['tweet']);
        break;
      case 'post':
        postRepository = new PostRepository(tx['post']);
      default:
        break;
    }
  }

  return {
    fileRepository,
    postRepository,
    tweetRepository
  };
};
