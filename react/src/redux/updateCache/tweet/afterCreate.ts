import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { tweetApi } from '../../tweet-slice';
import store, { RootState } from '../../store';

class CreateTweet {
  forYouTweetsPage: number;
  myTweetsPage: number;
  constructor(
    // eslint-disable-next-line
    private dispatch: ThunkDispatch<RootState, null, AnyAction>,
    private data: Tweet
  ) {
    const getAllTweetsArgs = store.getState().twitterApi.queries['getAllTweets']
      ?.originalArgs as { page: number } | undefined;
    this.forYouTweetsPage = getAllTweetsArgs?.page ?? 1;

    const getAllMyTweetsArgs = store.getState().twitterApi.queries[
      'getAllMyTweets'
    ]?.originalArgs as { page: number } | undefined;
    this.myTweetsPage = getAllMyTweetsArgs?.page ?? 1;
  }

  updateOnHomePage() {
    this.dispatch(
      tweetApi.util.updateQueryData(
        'getAllTweets',
        { page: this.forYouTweetsPage },
        ({ tweets }) => {
          tweets.splice(0, 0, this.data);
        }
      )
    );
  }

  updateOnProfilePage() {
    this.dispatch(
      tweetApi.util.updateQueryData(
        'getAllMyTweets',
        { page: this.myTweetsPage },
        ({ tweets }) => {
          tweets.splice(0, 0, this.data);
        }
      )
    );
  }
}

export default CreateTweet;
