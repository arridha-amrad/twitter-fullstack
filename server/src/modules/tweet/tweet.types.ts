import { File, Post, Tweet } from "@prisma/client";

export type IPostWithParentsAndChildren = IPostWithParents & {
	children: IPostWithParents[];
};

export type ITweet = Tweet & {
	post: IPostWithParents;
};

export type IPostWithParents = IPost & {
	parents: IPost[];
};

export type IPost = Post & {
	author: IAuthor;
	medias: File[];
	_count: IPostCount;
	isLiked: boolean;
	isRetweet: boolean;
};

export interface IPostCount {
	children: number;
	likes: number;
	medias: number;
	tweets: number;
}

export interface IAuthor {
	email: string;
	id: string;
	username: string;
	imageURL: string;
}

export type FetchedTweets = {
	tweets: Tweet[];
	total: number;
	currentPage: number;
	hasNextPage: boolean;
};
