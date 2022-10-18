import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

mongoose.connection.once("open", function () {
  console.log("Connection is established");
});

export const connectdb = async () => {
  return await mongoose.connect(process.env.MONGO_URL);
};
