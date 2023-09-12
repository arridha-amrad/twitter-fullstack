import { upload } from '@/utils/cloudinary';
import { UploadedFile } from 'express-fileupload';
import prisma from '@/prisma';

export const saveFiles = async (
  userId: string,
  postId: string,
  files: UploadedFile | UploadedFile[]
) => {
  const filesUrls: string[] = [];
  if (files instanceof Array) {
    for (let i = 0; i < files.length; i++) {
      const result = await upload(files[i]);
      filesUrls.push(result.secure_url);
    }
  } else {
    const result = await upload(files);
    filesUrls.push(result.secure_url);
  }
  await prisma.file.createMany({
    data: filesUrls.map((url) => ({ postId, url, userId }))
  });
};

export const uploadFiles = async (files: UploadedFile | UploadedFile[]) => {
  const filesUrls: string[] = [];
  if (files instanceof Array) {
    for (let i = 0; i < files.length; i++) {
      const result = await upload(files[i]);
      filesUrls.push(result.secure_url);
    }
  } else {
    const result = await upload(files);
    filesUrls.push(result.secure_url);
  }
  return filesUrls;
};
