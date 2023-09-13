import { UploadedFile } from 'express-fileupload';
import fs from 'fs';

class FileSystemService {
  static removeIncomingFiles(files: UploadedFile | UploadedFile[]) {
    if (files instanceof Array) {
      for (let file of files) {
        fs.unlinkSync(file.tempFilePath);
      }
      return;
    }
    fs.unlinkSync(files.tempFilePath);
  }

  static getPrivateKey() {
    return fs.readFileSync('./private.pem');
  }

  static getPublicKey() {
    return fs.readFileSync('./public.pem');
  }
}

export default FileSystemService;
