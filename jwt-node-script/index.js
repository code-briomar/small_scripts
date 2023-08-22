import Express  from "express"
import { KEYS } from "./config/keys.js";
import { generateAccessToken } from "./functions/generateAccessToken.js";
import { authenticateToken } from "./middleware/authenticateToken.js";

const app = Express();

app.use(Express.json())

app.post("/jwt-api/login",(req, res)=>{
    const token = generateAccessToken({username: req.body.username, email: req.body.email})
    res.json(token)
})

app.get("/jwt-api/getUser", authenticateToken, (req, res)=>{
    res.status(200).send({
        message: "Success"
    })
})


app.listen(KEYS.PORT,()=>{
    console.log(`Server running on port ${KEYS.PORT}`);
})