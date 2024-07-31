import multer from "multer";
import path from "path";
import fs from "fs-extra";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const user = req.user;
        const uploadPath = path.join(__dirname, `../../../uploads/${user.id}`);
        fs.ensureDirSync(uploadPath);
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});


export default multer({ storage });