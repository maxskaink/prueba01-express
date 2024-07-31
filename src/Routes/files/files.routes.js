import { Router } from "express";

import uploadMiddeleware from "../../middlewares/files/multer.middleware.js";

import { postFile } from "../../controllers/files.controllers.js";
const router = Router();

//No estoy seguro de como seguir
router.post("/files", uploadMiddeleware.single('file'), postFile);

export default router;