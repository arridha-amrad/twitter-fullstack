import { UploadedFile } from 'express-fileupload';
import CloudinaryService from './CloudinaryService';

class FileService {
  static async upload(files: UploadedFile | UploadedFile[]) {
    const urls: string[] = [];
    if (files instanceof Array) {
      for (const file of files) {
        const result = await CloudinaryService.upload(file);
        urls.push(result.secure_url);
      }
    } else {
      const result = await CloudinaryService.upload(files);
      urls.push(result.secure_url);
    }
    return urls;
  }
}

export default FileService;
