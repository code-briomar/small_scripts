import jwt from "jsonwebtoken";
import { KEYS } from "../config/keys.js"

export const authenticateToken = (req, res, next) =>{
    const authHeader = req.headers["authorization"]

    //If authHeader exists, split it and place values in an array 
    //and the value in the second position from the start, is the token
    const token = authHeader && authHeader.split(" ")[1];

    if(token == null) return res.sendStatus(401);

    jwt.verify(token, KEYS.TOKEN_SECRET, (err, user) =>{
        console.log(err);

        if(err) return res.sendStatus(403)

        req.user = user

        next()
    })
}
