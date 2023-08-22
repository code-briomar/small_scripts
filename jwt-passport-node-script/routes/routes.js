import Express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
export const router = Express.Router();

//Authenticate POST request to /signup route with passport middleware
router.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    res.json({
      message: "Signup successful",
      user: req.user,
    });
  }
);

//Sensitive info like passwords shouldn't be stored here.
router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("An error occured");

        return next(error);
      }

      //Session set to false to prevent storing user details in a session
      //User expected to send the token on each request to secure the routes

      //Useful but not recommended for perfomance
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        //id and email stored in the payload of the JWT
        //Sign the token with a secret or key ( 'TOP_SECRET' ).
        const body = { _id: user.id, email: user.email };
        const token = jwt.sign({ user: body }, "TOP_SECRET");

        //Send the token back to the user
        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});
