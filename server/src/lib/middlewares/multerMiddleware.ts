import { Request, Express } from "express";
import multer, { FileFilterCallback } from 'multer';
import path from 'path'
import fs from "fs"

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, callback: DestinationCallback) => {
    // path to save file
    fs.mkdirSync("src/public/uploads", { recursive: true }) // ถ้าไม่มี dir ที่จัดเก็บ ก็สร้าง
    callback(null, "src/public/uploads");
  },
  filename: (req: Request, file: Express.Multer.File, callback: FileNameCallback) => {
    // set file name
    callback(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (
  request: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
): void => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    callback(null, true)
  } else {
    callback(new Error("โปรดใช้ไฟล์นามสกุล png , jpg , jpeg เท่านั้น"))
  }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;
