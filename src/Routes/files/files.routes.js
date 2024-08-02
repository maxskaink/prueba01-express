import { Router } from "express";

import uploadMiddeleware from "../../middlewares/files/multer.middleware.js";

import { postFile,
         getFiles,
         getFile
 } from "../../controllers/files.controllers.js";
const router = Router();


router.get("/files", getFiles);

router.get("/files/:idUser/:fileName", getFile);

router.post("/files", uploadMiddeleware.single('file'), postFile);

export default router;