import { myApi } from './api';
import store from './store';
import CreateTweet from './updateCache/tweet/afterCreate';
import DeleteTweet from './updateCache/tweet/afterDelete';
import LikeTweet from './updateCache/tweet/afterLike';
import ReplyTweet from './updateCache/tweet/afterReply';
import Retweet from './updateCache/tweet/afterRetweet';

const PATH = '/api/tweets';

type FetchedTweets = {
  total: number;
  currentPage: number;
  hasNextPage: boolean;
  tweets: Tweet[];
};

const mergeData = (
  currentCacheData: FetchedTweets,
  responseData: FetchedTweets
) => {
  const oldTweets = currentCacheData.tweets;
  const newTweets = responseData.tweets;
  const data: FetchedTweets = {
    ...currentCacheData,
    ...responseData,
    tweets: [...oldTweets, ...newTweets]
  };
  return data;
};

export const tweetApi = myApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllMyTweets: builder.query<FetchedTweets, { page: number }>({
      query: ({ page }) => `${PATH}/mine?page=${page}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: mergeData,
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      }
    }),
    getAllMyReplies: builder.query<FetchedTweets, { page: number }>({
      query: ({ page }) => `${PATH}/replies/mine?page=${page}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: mergeData,
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      }
    }),
    getTweet: builder.query<TweetWithParents, string>({
      query: (tweetId) => `${PATH}/${tweetId}`,
      providesTags: (result) => [{ type: 'tweet', id: result?.id }],
      transformResponse(tweet: Tweet) {
        // set-parents
        const parents: Tweet[] = [];
        const loadParents = (tweet?: Tweet) => {
          if (!tweet) return;
          const { parent, ...rest } = tweet;
          parents.push(rest);
          if (parent) {
            loadParents(parent);
          }
        };
        loadParents(tweet.parent);
        const sortedParents = parents.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        const data: TweetWithParents = { ...tweet, parents: sortedParents };
        return data;
      }
    }),
    getTweetReplies: builder.query<
      FetchedTweets,
      { tweetId: string; page: number }
    >({
      query: ({ page, tweetId }) => `${PATH}/replies/${tweetId}?page=${page}`,
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}("${queryArgs.tweetId}")`;
      },
      onQueryStarted: async ({ tweetId }, api) => {
        try {
          const { data } = await api.queryFulfilled;
          api.dispatch(
            tweetApi.util.updateQueryData('getTweet', tweetId, (tweet) => {
              tweet.children = [...tweet.children, ...data.tweets];
            })
          );
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
    }),
    retweet: builder.mutation<Tweet | null, Tweet>({
      query: (tweet) => ({
        url: `${PATH}/retweet`,
        method: 'POST',
        body: { postId: tweet.postId }
      }),
      transformResponse(response: { tweet: Tweet | null }) {
        return response.tweet;
      },
      async onQueryStarted(arg, api) {
        const auth = store.getState().twitterApi.queries['me']?.data as
          | User
          | undefined;
        if (!auth) return;
        const { data } = await api.queryFulfilled;
        const RT = new Retweet(api.dispatch, arg, auth, data);
        RT.updateOnHomePage();
        RT.updateOnTweetPage();
      }
    }),
    createReplyTweet: builder.mutation<Tweet, { body: FormData; tweet: Tweet }>(
      {
        query: ({ body }) => ({
          url: `${PATH}/replies`,
          method: 'POST',
          body
        }),
        transformResponse: (response: { reply: Tweet }) => response.reply,
        async onQueryStarted({ tweet }, api) {
          const { data } = await api.queryFulfilled;
          if (!data) return;
          const Reply = new ReplyTweet(api.dispatch, tweet, data);
          Reply.updateOnHomePage();
          Reply.updateOnTweetPage();
          Reply.updateOnProfilePage();
        }
      }
    ),
    likeTweet: builder.mutation<'liked' | 'unLiked', Tweet>({
      query: (tweet) => ({
        url: `${PATH}/like`,
        body: { postId: tweet.postId },
        method: 'POST'
      }),
      onQueryStarted: async (arg, api) => {
        const auth = store.getState().twitterApi.queries['me']?.data as
          | User
          | undefined;
        if (!auth) return;
        const Like = new LikeTweet(api.dispatch, arg, auth);
        const { tweetPageMutation } = Like.updateOnTweetPage();
        const { homePageForYouTweets } = Like.updateOnHomePage();
        const { myRepliesMutation, myTweetsMutation } =
          Like.updateOnProfilePage();
        try {
          await api.queryFulfilled;
        } catch (error) {
          myRepliesMutation.undo();
          myTweetsMutation.undo();
          homePageForYouTweets.undo();
          tweetPageMutation.undo();
        }
      }
    }),
    deleteTweet: builder.mutation<void, Tweet>({
      query: (tweet) => ({
        url: `${PATH}/${tweet.id}`,
        method: 'DELETE'
      }),
      onQueryStarted: async (arg, api) => {
        const Delete = new DeleteTweet(api.dispatch, arg);
        const { deleteForYouTweets } = Delete.updateOnHomePage();
        const { deleteOnTweetPage } = Delete.updateOnTweetPage();
        const { deleteFromReplies, deleteFromTweets } =
          Delete.updateOnProfilePage();

        try {
          await api.queryFulfilled;
        } catch (err) {
          deleteForYouTweets.undo();
          deleteOnTweetPage.undo();
          deleteFromReplies.undo();
          deleteFromTweets.undo();
          throw err;
        }
      }
    }),
    createTweet: builder.mutation<Tweet, FormData>({
      query: (arg) => ({
        url: `${PATH}`,
        body: arg,
        method: 'POST'
      }),
      transformResponse: (data: { tweet: Tweet }) => data.tweet,
      onQueryStarted: async (arg, api) => {
        const { data } = await api.queryFulfilled;
        const Create = new CreateTweet(api.dispatch, data);
        Create.updateOnHomePage();
        Create.updateOnProfilePage();
      }
    }),
    getAllTweets: builder.query<FetchedTweets, { page: number }>({
      query: ({ page }) => `${PATH}?page=${page}`,
      providesTags: (data) =>
        data
          ? [
              ...data.tweets.map((tweet) => ({
                type: 'posts' as const,
                id: tweet.id
              })),
              { type: 'posts', id: 'LIST' }
            ]
          : [{ type: 'posts', id: 'LIST' }],
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: mergeData,
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      }
    })
  })
});

export const {
  useGetAllTweetsQuery,
  useCreateTweetMutation,
  useDeleteTweetMutation,
  useLikeTweetMutation,
  useCreateReplyTweetMutation,
  useRetweetMutation,
  useGetTweetQuery
  // useGetRepliesQuery,
  // useGetParentsQuery
} = tweetApi;
