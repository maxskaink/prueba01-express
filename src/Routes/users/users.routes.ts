import { Router } from "express";
import { createUsersMiddleware } from "../../middlewares/users/createUsers.middleware.ts";
import { loginUserMiddleware } from "../../middlewares/users/loginUser.middleware.ts";
import { updateUsersMiddleware, patchUsersMiddleware } from "../../middlewares/users/updateUsers.middleware.ts";
import { deleteUsersMiddleware } from "../../middlewares/users/deleteUsers.middleware.ts";
import { getUsers,
         getUserById,
         createUser,
         loginUser,
         updateUser,
         patchUser,
         deleteUser
 } from "../../controllers/users.controllers.ts";

const router = Router();

router.get("/users", getUsers);
router.get("/users/:idUser", getUserById);

router.put("/users", updateUsersMiddleware, updateUser);
router.patch("/users", patchUsersMiddleware, patchUser);

router.post("/login/users", loginUserMiddleware, loginUser);
router.post("/users", createUsersMiddleware ,createUser);

router.delete("/users", deleteUsersMiddleware, deleteUser);

export default router;