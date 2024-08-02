import { Router } from "express";

import uploadMiddeleware from "../../middlewares/files/multer.middleware.js";

import { postFile,
         getFiles,
         getFile,
         deleteFile
 } from "../../controllers/files.controllers.js";
const router = Router();


router.get("/files", getFiles);

router.get("/files/:idUser/:fileName", getFile);

router.post("/files", uploadMiddeleware.single('file'), postFile);

router.delete("/files/:idFile", deleteFile);

export default router;