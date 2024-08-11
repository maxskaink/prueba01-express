import { runMissingFields, runInvalidFormat } from "../../controllers/error.controllers.ts"
import { RequestLoginUser } from "../../models/requestUsers";
import { isEmail } from "../../utils/validation.ts";
import { Response } from "express";

export const loginUserMiddleware = (req:RequestLoginUser, res:Response, next:Function) => {
    const { email, password } = req.body;
    
    if(!email || !password) 
        return runMissingFields(req, res, "email and password are required");

    if(!isEmail(email))
        return runInvalidFormat(req, res, "The field email must be a valid email");

    next();
};