// import passport from "passport";
import { Strategy } from "passport-local";
import { validatePassword } from "./passwordUtlis.js";
import { userAuthModal as User } from "../models/User.mongo.js";

const customFields = {
  usernameField: "email",
  passwordField: "password",
};

const verifyCallback = async function (username, password, done) {
  console.log(username);
  return await User.findOne({ email: username }).then((user) => {
    if (!user) {
      return done(null, false);
    }

    const isValidPassword = validatePassword(password, user.salt, user.hash);
    if (isValidPassword) {
      return done(null, user);
    } else {
      done(null, false);
    }
  });
};

const LocalStrategy = new Strategy(customFields, verifyCallback);

const passportConfig = function (passport) {
  passport.use(LocalStrategy);

  passport.serializeUser((user, done) => {
    console.log(user.id);
    done(null, user.id);
  });

  passport.deserializeUser((userId, done) => {
    User.findById(userId)
      .then((user) => {
        if (user) {
          return done(null, user);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
};
export default passportConfig;
