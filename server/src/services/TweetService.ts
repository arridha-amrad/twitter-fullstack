import TweetRepository from '@/repositories/tweet/TweetRepository';
import { TweetWithParents } from '@/types/tweet.types';
import { Tweet } from '@prisma/client';

class TweetService {
  constructor(private tweetRepository: TweetRepository) {}
  private async loadParent(tweet: Tweet, parents: Tweet[]) {
    if (tweet.parentPostId) {
      const tweets = await this.tweetRepository.findParent(tweet.parentPostId);
      parents = tweets;
    }
    return parents;
  }

  async loadWithParent(tweet: Tweet) {
    let tweetWithParents: TweetWithParents;
    const parents = await this.loadParent(tweet, []);
    tweetWithParents = {
      ...tweet,
      parents
    };
    return tweetWithParents;
  }
}

export default TweetService;
