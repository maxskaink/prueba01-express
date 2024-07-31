import { verifyJWT } from "../../utils/encrypt.js";
import { runMissingFields, runUnauthorized} from "../../controllers/error.controllers.js"

export const authMiddleware = async (req, res, next) => {
    const jwt = req.headers.jwt;

    if(!jwt) 
        return runMissingFields(req, res, "Is necessary a JWT in the headers");
    const user = await verifyJWT(jwt)
        .catch((err) => runUnauthorized(req, res, err.message));
    if(!user) return;

    req.user = user;
    next();
};