import { Router } from "express";

const router = Router();

router.get("/isActive", (req, res) => res.sendStatus(204) );

export default router;