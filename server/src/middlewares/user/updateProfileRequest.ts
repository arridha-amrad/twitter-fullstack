import FileService from '@/services/FileService';
import { UpdateProfileDTO, UpdateProfileSchema } from '@/types/user.types';
import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

export type UpdateProfileRequest = UpdateProfileDTO & {
  avatarUrl: string;
  wallpaperUrl: string;
  authUserId: string;
};

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const avatar = req.files?.avatar;
  const wallpaper = req.files?.wallpaper;
  const authUserId = req.app.locals.userId;
  try {
    const result = await UpdateProfileSchema.parseAsync(req.body);

    let avatarUrl = '';
    if (avatar) {
      const result = await FileService.upload(avatar);
      avatarUrl = result[0];
    }
    let wallpaperUrl = '';
    if (wallpaper) {
      const result = await FileService.upload(wallpaper);
      wallpaperUrl = result[0];
    }

    const data: UpdateProfileRequest = {
      ...result,
      avatarUrl,
      wallpaperUrl,
      authUserId
    };

    req.app.locals = data;
    next();
  } catch (err: any) {
    if (err instanceof ZodError) {
      return res.status(400).json(err.flatten());
    }
    next(err);
  }
}
