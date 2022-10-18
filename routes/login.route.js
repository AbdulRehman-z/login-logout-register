import express from "express";
import passport from "passport";

export const loginRouter = express.Router();

loginRouter.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/admission",
    failureRedirect: "/register",
  })
);
