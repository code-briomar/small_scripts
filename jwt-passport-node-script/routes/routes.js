import Express from "express";
import passport from "passport";

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
