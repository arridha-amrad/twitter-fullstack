import { UploadedFile } from 'express-fileupload';
import fs from 'fs';

const removeIncomingFiles = (files: UploadedFile | UploadedFile[]) => {
  if (files instanceof Array) {
    for (let file of files) {
      fs.unlinkSync(file.tempFilePath);
    }
    return;
  }
  fs.unlinkSync(files.tempFilePath);
};

export default removeIncomingFiles;
