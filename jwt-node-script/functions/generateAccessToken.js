import jwt from "jsonwebtoken"
import { KEYS } from "../config/keys.js"
export const generateAccessToken = (username, email) =>{
    return jwt.sign({username,email}, KEYS.TOKEN_SECRET, {expiresIn: '3600s'})
}