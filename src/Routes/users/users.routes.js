import { Router } from "express";
import { createUsersMiddleware } from "../../middlewares/users/createUsers.middleware.js";
import { loginUserMiddleware } from "../../middlewares/users/loginUser.middleware.js";
import { updateUsersMiddleware, patchUsersMiddleware } from "../../middlewares/users/updateUsers.middleware.js";
import { deleteUsersMiddleware } from "../../middlewares/users/deleteUsers.middleware.js";
import { getUsers,
         getUserById,
         createUser,
         loginUser,
         updateUser,
         patchUser,
         deleteUser
 } from "../../controllers/users.controller.js";

const router = Router();

router.get("/users", getUsers);
router.get("/users/:idUser", getUserById);

router.put("/users", updateUsersMiddleware, updateUser);
router.patch("/users", patchUsersMiddleware, patchUser);

router.post("/login/users", loginUserMiddleware, loginUser);
router.post("/users", createUsersMiddleware ,createUser);

router.delete("/users", deleteUsersMiddleware, deleteUser);

export default router;