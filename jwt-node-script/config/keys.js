import dotenv from "dotenv"
dotenv.config();

export const KEYS = {
    PORT : process.env.PORT,
    TOKEN_SECRET : process.env.TOKEN_SECRET
}