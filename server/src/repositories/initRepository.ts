import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { Entities } from '../entities';
import FileRepository from './file/FileRepository';
import PostRepository from './post/PostRepository';
import TweetRepository from './tweet/TweetRepository';
import LikeRepository from './LikeRepository';
import TokenRepository from './TokenRepository';
import UserRepository from './UserRepository';
import RepostRepository from './repost/RepostRepository';

type DbClient = Omit<
  PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;

export const initRepositories = (
  tx: DbClient,
  entities: Entities[],
  authUserId?: string
) => {
  var fileRepository!: FileRepository;
  var postRepository!: PostRepository;
  var tweetRepository!: TweetRepository;
  var likeRepository!: LikeRepository;
  var tokenRepository!: TokenRepository;
  var userRepository!: UserRepository;
  var repostRepository!: RepostRepository;

  for (const entity of entities) {
    switch (entity) {
      case 'file':
        fileRepository = new FileRepository(tx['file']);
        break;
      case 'tweet':
        tweetRepository = new TweetRepository(tx['tweet'], authUserId);
        break;
      case 'post':
        postRepository = new PostRepository(tx['post']);
      case 'like':
        likeRepository = new LikeRepository(tx['like']);
      case 'token':
        tokenRepository = new TokenRepository(tx['token']);
      case 'user':
        userRepository = new UserRepository(tx['user']);
      case 'repost':
        repostRepository = new RepostRepository(tx['repost']);
      default:
        break;
    }
  }

  return {
    fileRepository,
    postRepository,
    tweetRepository,
    likeRepository,
    tokenRepository,
    userRepository,
    repostRepository
  };
};
