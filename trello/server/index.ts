import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";

import notFoundMiddleware from "./middlewares/not-found";
import errorHandlerMiddleware from "./middlewares/error-handler";
import { boardRoute } from "./routes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors({ origin: "http://localhost:3000" }));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use("/board", boardRoute);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions;

mongoose
  .connect(process.env.CONNECTION_URL, options)
  .then(() =>
    app.listen(PORT, () =>
      console.log(
        `Database connected and Server Running on Port http://localhost:${PORT}`,
      ),
    ),
  )
  .catch((error) => console.log(error.message));
