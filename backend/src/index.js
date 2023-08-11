const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const userRouter = require("./routes/users");
const recipeRouter = require("./routes/recipes");

const app = express();
const PORT = process.env.port || 3001;

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipeRouter);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
