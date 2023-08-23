import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import { Strategy as JWTStrategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import { UserModel } from "../model/model.js";
import { KEYS } from "../config/keys.js";

//Use passport-jwt to extract JWT from the query param.
//Verify that this token is signed with the secret or key set during logging in ('TOP_SECRET')
//If token is valid, the user details are passed to the next middleware

//If you will need extra or sensitive details about the user
//that are not available in the token, you could use the _id
//available on the token to retrieve them from the database.
passport.use(
  new JWTStrategy(
    {
      secretOrKey: KEYS.TOKEN_SECRET,
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter(KEYS.TOKEN_SECRET),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

//Save info provided to the database
//Send to the next middleware if successful.
//Otherwise, report an error
passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.create({ email, password });

        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

//Find user associated with email
passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },

    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email });

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: "Wrong password" });
        }

        return done(null, user, { message: "Logged in successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);
