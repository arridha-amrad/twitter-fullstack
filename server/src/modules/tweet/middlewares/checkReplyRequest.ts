import { NextFunction, Request, Response } from "express";
import prisma from "@/utils/prisma";
import { uploadFiles } from "../services/filesServices";
import { Tweet } from "@prisma/client";
import { getAuthId } from "@/utils/authId";

export type CheckReplyRequest = {
  description: string;
  postId: string;
  parentTweet: Tweet;
  fileUrls: string[];
  authenticatedUserId: string;
};

export const checkReplyRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { description, postId } = req.body;
  if (!description) {
    return res.status(200).json({ message: "description is required" });
  }
  if (!postId) {
    return res.status(200).json({ message: "postId is required" });
  }

  const authenticatedUserId = getAuthId()!;

  try {
    const parentTweet = await prisma.tweet.findFirst({
      where: { postId, isRetweet: false },
    });

    if (!parentTweet) {
      return res.status(404).json({ message: "Tweet not found" });
    }

    const files = req.files?.files;
    let fileUrls: string[] = [];
    if (files) {
      fileUrls = await uploadFiles(files);
    }

    const data: CheckReplyRequest = {
      description,
      postId,
      parentTweet,
      fileUrls,
      authenticatedUserId,
    };

    req.app.locals = data;

    next();
  } catch (err) {
    next(err);
  }
};
