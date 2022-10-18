import { postRegisterUserController } from "./register.controller.js";
import express from "express";

export const registerRouter = express.Router();
registerRouter.post("/", postRegisterUserController);
