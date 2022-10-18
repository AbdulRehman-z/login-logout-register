import { app } from "./app.js";
import { connectdb } from "./config/mongoose.service.js";
import * as dotenv from "dotenv";
dotenv.config();

app.listen(process.env.PORT, async function () {
  await connectdb();
  console.log("Server listening on port " + process.env.PORT);
});
