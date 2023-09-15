import { UpdateProfileRequest } from '@/middlewares/user/updateProfileRequest';
import prisma from '@/prisma';
import { initRepositories } from '@/repositories/initRepository';
import CloudinaryService from '@/services/CloudinaryService';
import { NextFunction, Request, Response } from 'express';

export default async function updateProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {
    authUserId,
    avatarUrl,
    bio,
    fullname,
    location,
    wallpaperUrl,
    web,
    birthDate
  } = req.app.locals as UpdateProfileRequest;

  try {
    const result = await prisma.$transaction(async (tx) => {
      const { userRepository } = initRepositories(tx, ['user']);
      const user = await userRepository.findById(authUserId);
      if (!user) {
        throw new Error('User not found');
      }
      return userRepository.update(
        { id: user.id },
        {
          avatarUrl,
          bio,
          fullname,
          location,
          wallpaper: wallpaperUrl,
          website: web,
          birthDate
        }
      );
    });
    const { password, ...rest } = result;
    return res.status(200).json({ message: 'Update successfully', user: rest });
  } catch (err) {
    if (avatarUrl !== '') {
      await CloudinaryService.remove(avatarUrl);
    }
    if (wallpaperUrl !== '') {
      await CloudinaryService.remove(wallpaperUrl);
    }
    next(err);
  } finally {
    await prisma?.$disconnect();
  }
}
