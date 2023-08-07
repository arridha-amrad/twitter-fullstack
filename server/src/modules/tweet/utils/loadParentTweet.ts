import { Tweet } from "@prisma/client";
import { loadTweet } from "./loadTweet";

export const loadParentTweet = async (
	tweet: Tweet & { parent?: null | Tweet },
	authenticatedUserId: string = ""
) => {
	if (tweet.parentId) {
		const parent = await loadTweet(tweet.parentId, authenticatedUserId);
		if (parent) {
			tweet.parent = parent;
			if (parent.parentId) {
				await loadParentTweet(tweet.parent, authenticatedUserId);
			}
		}
	}
};
