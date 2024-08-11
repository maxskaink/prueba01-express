import { runMissingFields,runInvalidFormat } from "../../controllers/error.controllers.ts";
import { RequestCreateUser } from "../../models/requestUsers";
import { isEmail } from "../../utils/validation.ts";
import { Response } from "express";

export const updateUsersMiddleware = async (req: RequestCreateUser, res:Response, next: Function) => {
    const {jwt} = req.headers;
    const {name, email, password} = req.body;

    if(!jwt) return runMissingFields(req, res, "jwt is required");
    if(!name) return runMissingFields(req, res, "name is required");
    if(!email) return runMissingFields(req, res, "email is required");
    if(!password) return runMissingFields(req, res, "password is required");

    if(!isEmail(email)) 
        return runInvalidFormat(req, res, "The field email must be a valid email");
    if(password.length < 8) 
        return runInvalidFormat(req, res, "Password must have at least 8 characters");
    next();
};

export const patchUsersMiddleware = async (req: RequestCreateUser, res:Response, next: Function) => {
    const {jwt} = req.headers;
    const {name, email, password} = req.body;

    if(!jwt) return runMissingFields(req, res, "jwt is required");
    
    if(!name && !email && !password) 
        return runMissingFields(req, res, "At least one field is required");

    if(!isEmail(email) && email)
        return runInvalidFormat(req, res, "The field email must be a valid email");
    if(password?.length < 8 && password) 
        return runInvalidFormat(req, res, "Password must have at least 8 characters");
    next();
};