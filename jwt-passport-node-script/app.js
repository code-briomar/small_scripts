import Express from "express";
import mongoose from "mongoose";
import passport from "passport";
import bodyParser from "body-parser";

import { UserModel } from "./model/model.js";

mongoose.connect("mongodb://127.0.0.1:27017/passport-jwt", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);
mongoose.connection.on("error", (error) => console.log(error));
mongoose.Promise = global.Promise;

import "./auth/auth.js";

import routes from "./routes/routes.js";
import secureRoute from "./routes/secure-routes.js";

const app = Express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", routes);

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use("/user", passport.authenticate("jwt", { session: false }), secureRoute);

// Handle errors.
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(3000, () => {
  console.log(`Server started on PORT : ${3000}`);
});
