import prisma from '@/utils/prisma';

export type TweetEntity = typeof prisma.tweet;
export type PostEntity = typeof prisma.post;
export type FileEntity = typeof prisma.file;
