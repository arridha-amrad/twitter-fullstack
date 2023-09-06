import { isAuthenticated } from "@/utils/isAuthenticated";
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

router.get("/mine", isAuthenticated, getMyTweets);
router.get("/", optionalProtected, loadTweets);
router.get("/replies/mine", isAuthenticated, getAllMyReplies);
router.get("/replies/:tweetId", optionalProtected, getTweetReplies);
router.get("/:tweetId", optionalProtected, getTweetDetail);

router.delete("/:tweetId", isAuthenticated, deleteTweet);

router.post("/", sanitize, isAuthenticated, createTweet);
router.post("/like", sanitize, isAuthenticated, likeTweet);
router.post("/replies", sanitize, isAuthenticated, createReply);
router.post("/retweet", isAuthenticated, retweet);

export default router;
