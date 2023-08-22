import passport from "passport"
import { Strategy as localStrategy } from "passport-local";
import UserModel from "../model/model.js"

//Save info provided to the database
//Send to the next middleware if successful.
//Otherwise, report an error
passport.use(
    'signup',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        }
    ),
    async (email, password, done) =>{
        try {
            const user = await UserModel.create({email, password})

            return done(null, user)
        } catch (error) {
            done(error)
        }
    }
)