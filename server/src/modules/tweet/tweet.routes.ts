import { sanitize } from "@/utils/sanitizeInput";
import express from "express";
import requireAuth from "../middlewares/requireAuth";
import createReply from "./controllers/createReplyController";
import createTweet from "./controllers/createTweetController";
import deleteTweet from "./controllers/deleteTweetController";
import { getTweetDetail } from "./controllers/getTweetController";
import likeTweet from "./controllers/likeTweetController";
import loadForYouTweets from "./controllers/loadForYouTweets";
import loadReplies from "./controllers/loadReplies";
import loadUserReplies from "./controllers/loadUserReplies";
import loadUserTweets from "./controllers/loadUserTweets";
import retweet from "./controllers/retweetController";
import optionalAuth from "./middlewares/optionalAuth";

const router = express.Router();

router.get("/user/:username/:page", optionalAuth, loadUserTweets);
router.get("/for-you/:page", optionalAuth, loadForYouTweets);
router.get("/followings/:page", optionalAuth, (req, res) => {
  res.send("Followings tweets");
});
router.get("/user/replies/:username/:page", optionalAuth, loadUserReplies);
router.get("/replies/:tweetId/:page", optionalAuth, loadReplies);
router.get("/detail/:tweetId", optionalAuth, getTweetDetail);

router.delete("/:tweetId", requireAuth, deleteTweet);

router.post("/", sanitize, requireAuth, createTweet);
router.post("/like", sanitize, requireAuth, likeTweet);
router.post("/replies", sanitize, requireAuth, createReply);
router.post("/retweet", requireAuth, retweet);

export default router;
