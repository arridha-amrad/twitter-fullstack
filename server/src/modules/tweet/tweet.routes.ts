import { sanitize } from "@/utils/sanitizeInput";
import express from "express";
import requireAuth from "../middlewares/requireAuth";
import createReply from "./controllers/createReply";
import createTweet from "./controllers/createTweet";
import deleteTweet from "./controllers/deleteTweet";
import loadTweet from "./controllers/loadTweet";
import likeTweet from "./controllers/likeTweet";
import loadForYouTweets from "./controllers/loadForYouTweets";
import loadReplies from "./controllers/loadReplies";
import loadUserReplies from "./controllers/loadUserReplies";
import loadUserTweets from "./controllers/loadUserTweets";
import retweet from "./controllers/retweet";
import optionalAuth from "./middlewares/optionalAuth";
import { checkReplyRequest } from "./middlewares/checkReplyRequest";

const router = express.Router();

router.get("/user/:username/:page", optionalAuth, loadUserTweets);
router.get("/for-you/:page", optionalAuth, loadForYouTweets);
router.get("/followings/:page", optionalAuth, (req, res) => {
  res.send("Followings tweets");
});
router.get("/user/replies/:username/:page", optionalAuth, loadUserReplies);
router.get("/replies/:tweetId/:page", optionalAuth, loadReplies);
router.get("/detail/:tweetId", optionalAuth, loadTweet);

router.delete("/:tweetId", requireAuth, deleteTweet);

router.post("/", sanitize, requireAuth, createTweet);
router.post("/like", sanitize, requireAuth, likeTweet);
router.post("/replies", sanitize, requireAuth, checkReplyRequest, createReply);
router.post("/retweet", requireAuth, retweet);

export default router;
