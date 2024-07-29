import { Router } from "express";
import { createUsersMiddleware } from "../../middlewares/createUsers.middleware.js";
import { loginUserMiddleware } from "../../middlewares/loginUser.middleware.js";
import { getUsers,
         getUserById,
         createUser,
         loginUser
 } from "../../controllers/users.controller.js";

const router = Router();

router.get("/users", getUsers);
router.get("/users/:idUser", getUserById);
router.post("/login/users", loginUserMiddleware, loginUser);

router.post("/users", createUsersMiddleware ,createUser);

export default router;