import { userAuthModal as User } from "./User.mongo.js";

let DEFAULT_ID = 0;

export const userExist = async function (user) {
  const isUserExist = await User.findOne({ email: user.email });
  return isUserExist;
};

const getLatestId = async function () {
  const latestUser = await User.findOne().sort("-userId");
  if (!latestUser) {
    return DEFAULT_ID;
  }
  console.log(latestUser);
  return latestUser.userId;
};

const saveUser = async function (user) {
  try {
    console.log(user);
    return await User.create(user);
  } catch (error) {
    console.error(error);
  }
};

export const registerNewUser = async function (newUser) {
  try {
    const latestUser = +(await getLatestId()) + 1;
    const user = Object.assign(newUser, {
      userId: latestUser,
    });
    await saveUser(user);
  } catch (error) {
    console.log(error);
  }
};
