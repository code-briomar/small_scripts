import Express  from "express"
import { KEYS } from "./config/keys.js";
import { generateAccessToken } from "./functions/generateAccessToken.js";

const app = Express();

app.use(Express.json())

app.post("/jwt-api/login",(req, res)=>{
    const token = generateAccessToken({username: req.body.username})
    res.json(token)
})


app.listen(KEYS.PORT,()=>{
    console.log(`Server running on port ${KEYS.PORT}`);
})