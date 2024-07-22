import { Router } from "express";
import { createUsersMiddleware } from "../../middlewares/createUsers.middleware.js";
import { getUsers,
         getUserById,
         createUser
 } from "../../controllers/users.controller.js";

const router = Router();

router.get("/users", getUsers);
router.get("/users/:idUser", getUserById);

router.post("/users", createUsersMiddleware ,createUser);

export default router;