import { sanitize } from '@/middlewares/sanitizeInput';
import express from 'express';
import createReply from '../controllers/tweet/createReply';

import createTweet from '@/controllers/tweet/createTweet';
import deleteTweet from '@/controllers/tweet/deleteTweet';
import likeTweet from '@/controllers/tweet/likeTweet';
import loadForYouTweets from '@/controllers/tweet/loadForYouTweets';
import loadReplies from '@/controllers/tweet/loadReplies';
import loadTweet from '@/controllers/tweet/loadTweet';
import loadUserReplies from '@/controllers/tweet/loadUserReplies';
import loadUserTweets from '@/controllers/tweet/loadUserTweets';
import retweet from '@/controllers/tweet/retweet';

import Authentication from '../middlewares/Authentication';
import { checkCreateReplyRequest } from '../middlewares/createReplyRequest';
import { checkCreateTweetRequest } from '../middlewares/createTweetRequest';
import loadUserLikedTweets from '@/controllers/tweet/loadUserLikedTweets';
import loadUserTweetsWithMedia from '@/controllers/tweet/loadUserTweetsWithMedia';

const router = express.Router();

router.get('/user/:username/:page', Authentication.optional, loadUserTweets);

router.get('/for-you/:page', Authentication.optional, loadForYouTweets);

router.get('/followings/:page', Authentication.optional, (req, res) => {
  res.status(200).send('Followings tweets');
});

router.get(
  '/user/replies/:username/:page',
  Authentication.optional,
  loadUserReplies
);

router.get('/replies/:postId/:page', Authentication.optional, loadReplies);

router.get('/detail/:tweetId', Authentication.optional, loadTweet);

router.get(
  '/likes/:username/:page',
  Authentication.required,
  loadUserLikedTweets
);

router.get(
  '/media/:username/:page',
  Authentication.required,
  loadUserTweetsWithMedia
);

router.delete('/:tweetId', Authentication.required, deleteTweet);

router.post(
  '/',
  sanitize,
  Authentication.required,
  checkCreateTweetRequest,
  createTweet
);

router.post('/like', sanitize, Authentication.required, likeTweet);

router.post(
  '/replies',
  sanitize,
  Authentication.required,
  checkCreateReplyRequest,
  createReply
);

router.post('/retweet', Authentication.required, retweet);

export default router;
