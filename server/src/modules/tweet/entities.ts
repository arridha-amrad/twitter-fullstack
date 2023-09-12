import prisma from '@/prisma';
export type Entities = 'tweet' | 'post' | 'file';

export type TweetEntity = typeof prisma.tweet;
export type PostEntity = typeof prisma.post;
export type FileEntity = typeof prisma.file;
