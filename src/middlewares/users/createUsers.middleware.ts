import { isEmail  } from "../../utils/validation.ts";
import { runInvalidFormat, runMissingFields } from "../../controllers/error.controllers.ts";
import { Response, Request } from "express";
import { RequestCreateUser } from "../../models/requestUsers";

export const createUsersMiddleware = async (req: RequestCreateUser, res:Response, next: Function) => {
    const { name, email, password } = req.body;
  
    if (!name || !email || !password) {

        const extraInfo = `This shields are required: ${!name ? "-name" : ""}${!email ? "-email" : ""}${!password ? "-password" : ""}`;
        return runMissingFields(req, res, extraInfo);
    }
  
    if (!isEmail(email)) 
        return runInvalidFormat(req, res, "Invalid email format (example@123.com)");
  
    if (password.length < 8) 
        return runInvalidFormat(req, res, "Password must have at least 8 characters");
  
    next();
};

