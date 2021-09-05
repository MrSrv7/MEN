import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv-flow";
import constants from "./constants.json";

config();

const app = express();

const DB = process.env.DB;
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  //eslint-disable-next-line no-console
  console.log(`${constants.server.connected} : http://localhost:${PORT} `);
});

mongoose.connect(
  DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, db) => {
    //eslint-disable-next-line no-console
    if (db) console.log(constants.mongodb.dbConnect);
    else throw new Error(constants.error.unexpected, { cause: err });
  }
);

app.use("/get", (err, db) => {
  db.json({ msg: "check" });
});
