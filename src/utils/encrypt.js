import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../../config/API.js";

export const sha256 = async (message) => {
  const msgBuffer = new TextEncoder("utf-8").encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => ("00" + b.toString(16)).slice(-2))
    .join("");
  return hashHex;
};

export const makeJWT = async (payload) => {
  return jwt.sign(payload, TOKEN_SECRET, { expiresIn: '2h' });
};

export const verifyJWT = async (token) => {
  return jwt.verify(token, TOKEN_SECRET);
};