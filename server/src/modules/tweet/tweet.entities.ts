import prisma from '@/utils/prisma';
import FileRepository from './repositories/FileRepository';
import { PrismaClient, Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import PostRepository from './repositories/PostRepository';
import TweetRepository from './repositories/TweetRepository';

type Entities = 'tweet' | 'post' | 'file';

type Transaction = Omit<
  PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;

export const getEntities = (tx: Transaction, entities: Entities[]) => {
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

export type TweetEntity = typeof prisma.tweet;
export type PostEntity = typeof prisma.post;
export type FileEntity = typeof prisma.file;
