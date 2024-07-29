import { runUnauthorized } from "../../controllers/error.controllers.js";

export const deleteUsersMiddleware = async (req, res, next) => {
    const {jwt} = req.headers;
    if(!jwt) 
        return runUnauthorized(req, res, "Invalid JWT");

    next();
};