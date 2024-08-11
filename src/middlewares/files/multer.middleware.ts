import multer from "multer";
import path from "path";
import fs from "fs-extra";
import { Request } from "express";

import { fileURLToPath } from "url";
import { RequestLogUser } from "../../models/requestUsers";

const __filename:string = fileURLToPath(import.meta.url);
const __dirname:string = path.dirname(__filename);

const storage:multer.StorageEngine = multer.diskStorage({
    destination: async(req: Request, file, cb) => {
        const user = (req as RequestLogUser).user;
        const uploadPath:string = path.join(__dirname, `../../uploads/${user.id}`);
        fs.ensureDirSync(uploadPath);
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

export default multer({storage})