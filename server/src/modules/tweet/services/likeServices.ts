import prisma from "@/utils/prisma";
import { Like } from "@prisma/client";

export const findLike = async (
  postId: string,
  userId: string
): Promise<Like | null> => {
  const like = await prisma.like.findFirst({
    where: {
      postId,
      userId,
    },
  });
  return like;
};
