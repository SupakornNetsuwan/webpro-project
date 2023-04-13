import path from 'path'
import { Request } from "express";
import multer, { FileFilterCallback } from 'multer';

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

var storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, callback: DestinationCallback) {
    callback(null, "./static/uploads"); // path to save file
  },
  filename: function (req: Request, file: Express.Multer.File, callback: FileNameCallback) {
    // set file name
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

module.exports = upload;
