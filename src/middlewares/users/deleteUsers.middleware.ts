import { runUnauthorized } from "../../controllers/error.controllers.ts";
import { RequestJWT } from "../../models/requestUsers";
import { Response, Request } from "express";

export const deleteUsersMiddleware = async (req: Request, res: Response, next: Function) => {
    const {jwt} = req.headers;
    if(!jwt) 
        return runUnauthorized(req, res, "Invalid JWT");

    next();
};