import jwt,{ JwtPayload} from "jsonwebtoken";
import { TOKEN_SECRET } from "../../config/API.ts";

export const sha256 = async(message: string): Promise<string> => {
    const msgBuffer = new TextEncoder().encode(JSON.stringify(message));
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
    return hashHex;
}

export const makeJWT = async(payload: object): Promise<string> => {
    return jwt.sign(payload, TOKEN_SECRET, { expiresIn: '2h' });
}

export const verifyJWT = async(token: string) => {
    return jwt.verify(token, TOKEN_SECRET);
}