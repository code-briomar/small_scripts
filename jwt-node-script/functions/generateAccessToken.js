import jwt from "jsonwebtoken"
import { KEYS } from "../config/keys.js"
export const generateAccessToken = (username) =>{
    return jwt.sign(username, KEYS.TOKEN_SECRET, {expiresIn: '3600s'})
}