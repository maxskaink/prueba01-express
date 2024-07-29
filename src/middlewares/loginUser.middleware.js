import { runMissingFields, runInvalidFormat } from "../controllers/error.controllers.js"
import { isEmail } from "../utils/validations.js";

export const loginUserMiddleware = (req, res, next) => {
    const { email, password } = req.body;
    
    if(!email || !password) 
        return runMissingFields(req, res, "email and password are required");

    if(!isEmail(email))
        return runInvalidFormat(req, res, "The field email must be a valid email");

    next();
};