import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import constants from "./constants.json";
import swaggerDoc from "./apis";
import userRouter from "./routes/userRoute";

const app = express();

const URI = process.env.URI;
const PORT = process.env.PORT;

app.use("/", swaggerUi.serve);
app.get("/", swaggerUi.setup(swaggerDoc, { explorer: true }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  //eslint-disable-next-line no-console
  console.log(`${constants.server.connected} : http://localhost:${PORT} `);
});

mongoose.connect(
  URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, db) => {
    //eslint-disable-next-line no-console
    if (db) console.log(constants.db.dbConnect);
    else throw new Error(constants.error.unexpected, { cause: err });
  }
);

app.use("/user", userRouter);
