import cloudinary from 'cloudinary';
import { UploadedFile } from 'express-fileupload';
import FileSystemService from './FileSystemService';

class CloudinaryService {
  private static instance = cloudinary.v2.uploader;
  private static folder = 'twitter-clone';

  static init() {
    cloudinary.v2.config({
      api_key: process.env.CLOUDINARY_KEY!,
      api_secret: process.env.CLOUDINARY_SECRET!,
      cloud_name: process.env.CLOUDINARY_NAME!
    });
  }

  static async upload(file: UploadedFile) {
    const result = await this.instance.upload(
      file.tempFilePath,
      {
        folder: this.folder,
        transformation: {
          quality: 85
        }
      },
      (error, _) => {
        if (error) {
          throw error;
        }
      }
    );
    FileSystemService.removeIncomingFiles(file);
    return result;
  }

  static async remove(url: string) {
    const publicId = url.slice(url.lastIndexOf(this.folder)).split('.')[0];
    await cloudinary.v2.uploader.destroy(publicId);
  }
}

export default CloudinaryService;
