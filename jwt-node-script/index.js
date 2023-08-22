import Express  from "express"
import jwt from "jsonwebtoken"
import { KEYS } from "./config/keys.js";


const app = Express();

app.listen(KEYS.PORT,()=>{
    console.log(`Server running on port ${KEYS.PORT}`);
})