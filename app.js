const express = require("express");
require("dotenv/config");
const app = express();
const mongoose = require("mongoose");
const PORT = 5000;
const authJwt = require('./helpers/jwt');
const { User } = require("./models/user");

const authRoutes = require("./routes/auth");

app.use(express.json());
app.use(authJwt);
app.use(authRoutes);

//Database
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

//Server
app.listen(PORT, () => {
  console.log("server running on", PORT);
});
