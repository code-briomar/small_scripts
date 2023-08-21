import Express  from "express"
import jwt from "jsonwebtoken"

const app = Express();

app.listen(KEYS.PORT,()=>{
    console.log(`Server running on port ${KEYS.PORT}`);
})