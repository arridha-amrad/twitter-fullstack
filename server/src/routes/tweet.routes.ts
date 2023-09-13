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
import { checkCreateReplyRequest } from '../middlewares/checkCreateReplyRequest';
import { checkCreateTweetRequest } from '../middlewares/checkCreateTweetRequest';

const router = express.Router();

router.get('/user/:username/:page', Authentication.optional, loadUserTweets);

router.get('/for-you/:page', Authentication.optional, loadForYouTweets);

router.get('/followings/:page', Authentication.optional, (req, res) => {
  res.send('Followings tweets');
});

router.get(
  '/user/replies/:username/:page',
  Authentication.optional,
  loadUserReplies
);

router.get('/replies/:tweetId/:page', Authentication.optional, loadReplies);

router.get('/detail/:tweetId', Authentication.optional, loadTweet);

router.delete('/:tweetId', Authentication.require, deleteTweet);

router.post(
  '/',
  sanitize,
  Authentication.require,
  checkCreateTweetRequest,
  createTweet
);
router.post('/like', sanitize, Authentication.require, likeTweet);

router.post(
  '/replies',
  sanitize,
  Authentication.require,
  checkCreateReplyRequest,
  createReply
);

router.post('/retweet', Authentication.require, retweet);

export default router;
