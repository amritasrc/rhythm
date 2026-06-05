import express from "express";
// import mongoose from "mongoose"
import cors from "cors";

import { configDotenv } from "dotenv";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5555;
// const mongoDBURL = process.env.mongoDBURL;

app.use(cors());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(200).send("Hello from server");
});

app.listen(PORT, () => {
  console.log(`App is running on PORT: ${PORT}`);
});

// mongoose.connect(mongoDBURL).then(() => {
//   console.log("App is connected to DB");
//   app
//     .listen(PORT, () => {
//       console.log(`App is running on PORT: ${PORT}`);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });
