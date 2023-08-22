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

//Find user associated with email
passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },

        async (email, password, done) =>{
            try{
                const user = await UserModel.findOne({email})

                if(!user){
                    return done(null, false, {message: "User not found"})
                }

                const validate = await user.isValidPassword(password)

                if(!validate){
                    return done(null, false, { message : "Wrong password"})
                }

                return done(null, user, {message: "Logged in successfully"})
            } catch(error){
                return done(error)
            }
        },
    )
)