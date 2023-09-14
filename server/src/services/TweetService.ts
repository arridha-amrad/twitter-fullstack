import TweetRepository from '@/repositories/tweet/TweetRepository';
import { TweetWithParents } from '@/types/tweet.types';
import { Tweet } from '@prisma/client';

class TweetService {
  constructor(private tweetRepository: TweetRepository) {}
  private async loadParent(tweet: Tweet, parents: Tweet[]) {
    if (tweet.replyPostId) {
      const tw = await this.tweetRepository.findOne(
        {
          postId: tweet.replyPostId
        },
        true
      );
      if (tw) {
        parents.push(tw);
        this.loadParent(tw, parents);
      }
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
