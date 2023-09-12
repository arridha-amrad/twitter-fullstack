import { sanitize } from '@/middlewares/sanitizeInput';
import express from 'express';
import createReply from '../modules/tweet/controllers/createReply';
import createTweet from '../modules/tweet/controllers/createTweet';
import deleteTweet from '../modules/tweet/controllers/deleteTweet';
import loadTweet from '../modules/tweet/controllers/loadTweet';
import likeTweet from '../modules/tweet/controllers/likeTweet';
import loadForYouTweets from '../modules/tweet/controllers/loadForYouTweets';
import loadReplies from '../modules/tweet/controllers/loadReplies';
import loadUserReplies from '../modules/tweet/controllers/loadUserReplies';
import loadUserTweets from '../modules/tweet/controllers/loadUserTweets';
import retweet from '../modules/tweet/controllers/retweet';
import { checkCreateReplyRequest } from '../modules/tweet/middlewares/checkCreateReplyRequest';
import { checkCreateTweetRequest } from '../modules/tweet/middlewares/checkCreateTweetRequest';
import Authentication from '../middlewares/Authentication';

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
