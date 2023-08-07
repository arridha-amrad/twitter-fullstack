import store from '../../store';

class AfterMutation {
  tweetIdParam: string;
  getAllTweetsPage: number;
  getAllMyTweetsPage: number;
  getAllMyRepliesPage: number;

  constructor() {
    this.tweetIdParam = window.location.pathname.replace('/tweet/', '');

    const getAllTweetsArg = store.getState().twitterApi.queries['getAllTweets']
      ?.originalArgs as { page: number } | undefined;
    this.getAllTweetsPage = getAllTweetsArg?.page ?? 1;

    const getAllMyTweetsArg = store.getState().twitterApi.queries[
      'getAllMyTweets'
    ]?.originalArgs as { page: number } | undefined;
    this.getAllMyTweetsPage = getAllMyTweetsArg?.page ?? 1;

    const getAllMyRepliesArg = store.getState().twitterApi.queries[
      'getAllMyReplies'
    ]?.originalArgs as { page: number } | undefined;
    this.getAllMyRepliesPage = getAllMyRepliesArg?.page ?? 1;
  }
}

export default AfterMutation;
