import { UploadedFile } from "express-fileupload";
import cloudinary from "cloudinary";
import fs from "fs";

export const upload = async (file: UploadedFile) => {
  try {
    const result = await cloudinary.v2.uploader.upload(
      file.tempFilePath,
      {
        folder: "twitter-clone",
        transformation: {
          quality: 85,
        },
      },
      (error, _) => {
        if (error) {
          throw error;
        }
      }
    );
    fs.unlinkSync(file.tempFilePath);
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteImage = async (url: string) => {
  try {
    const publicId = url.slice(url.lastIndexOf("twitter-clone")).split(".")[0];
    await cloudinary.v2.uploader.destroy(publicId);
  } catch (err) {
    throw err;
  }
};
