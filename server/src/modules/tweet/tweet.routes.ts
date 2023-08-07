import { authenticationGuard } from "@/utils/authenticationGuard";
import express from "express";
import createReply from "./controllers/createReplyController";
import createTweet from "./controllers/createTweetController";
import loadTweets from "./controllers/getAllTweetsController";
import likeTweet from "./controllers/likeTweetController";
import getTweetReplies from "./controllers/getAllRepliesController";
import deleteTweet from "./controllers/deleteTweetController";
import retweet from "./controllers/retweetController";
import { sanitize } from "@/utils/sanitizeInput";
import { getTweetDetail } from "./controllers/getTweetController";
import { optionalProtected } from "./utils/optionalProtected";
import getMyTweets from "./controllers/getAllMyTweetsController";
import getAllMyReplies from "./controllers/getAllMyRepliesController";

const router = express.Router();

router.get("/mine", authenticationGuard, getMyTweets);
router.get("/", optionalProtected, loadTweets);
router.get("/replies/mine", authenticationGuard, getAllMyReplies);
router.get("/replies/:tweetId", optionalProtected, getTweetReplies);
router.get("/:tweetId", optionalProtected, getTweetDetail);

router.delete("/:tweetId", authenticationGuard, deleteTweet);

router.post("/", sanitize, authenticationGuard, createTweet);
router.post("/like", sanitize, authenticationGuard, likeTweet);
router.post("/replies", sanitize, authenticationGuard, createReply);
router.post("/retweet", authenticationGuard, retweet);

export default router;
