import prisma from '@/prisma';
export type Entities =
  | 'tweet'
  | 'post'
  | 'file'
  | 'like'
  | 'repost'
  | 'token'
  | 'user';

export type UserEntity = typeof prisma.user;
export type TweetEntity = typeof prisma.tweet;
export type PostEntity = typeof prisma.post;
export type FileEntity = typeof prisma.file;
export type TokenEntity = typeof prisma.token;
export type LikeEntity = typeof prisma.like;
export type RepostEntity = typeof prisma.repost;
