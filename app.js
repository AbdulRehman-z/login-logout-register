import express from "express";
import cors from "cors";
import morgan from "morgan";
import * as dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import passportConfig from "./config/passport.js";
import { registerRouter } from "./routes/register.route.js";
import { loginRouter } from "./routes/login.route.js";
import { logoutRouter } from "./routes/logout.router.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();
export const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      dbName: "test",
      collectionName: "session-storage",
      ttl: 14 * 24 * 60 * 60,
    }),
    cookie: {
      maxAge: 14 * 24 * 60 * 60,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
