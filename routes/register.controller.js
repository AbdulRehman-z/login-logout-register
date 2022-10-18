import { genPassword } from "../config/passwordUtlis.js";
import { registerNewUser, userExist } from "../models/register.modal.js";

export const postRegisterUserController = async function (req, res, next) {
  const saltHash = genPassword(req.body.password);
  const salt = saltHash.salt;
  const hash = saltHash.hash;
  const newUser = {
    email: req.body.email,
    salt: salt,
    hash: hash,
  };

  if (await userExist(newUser)) {
    return res
      .status(500)
      .json({ success: false, error: "User already exists" });
  } else {
    await registerNewUser(newUser);
  }
  return res.status(201).json(newUser);
};
