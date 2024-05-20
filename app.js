const express = require("express");
require("dotenv/config");
const app = express();
var cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const PORT = 5000;
const errorHandler = require("./helpers/error-handler");

//Database
mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.DB_CONNECT, {
    dbName: "instagrameme",
  })
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

const { User } = require("./models/user");
const { Post } = require("./models/post");

const postRoutes = require("./routes/posts");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

app.use(cors());

app.use(express.json());
app.use(bodyParser.json());
//app.use(authJwt());
app.use(errorHandler);

app.use(authRoutes);
app.use(postRoutes);
app.use(userRoutes);

//Server
app.listen(PORT, () => {
  console.log("server running on", PORT);
});
