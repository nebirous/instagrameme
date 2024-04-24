const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ error: "you must be logged in" });
  }

  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.SECRET, (err, payload) => {
    if (err) {
      res.status(401).send(err);
    }

    const { _id: userId } = payload;

    User.findById(userId).then((userData) => {
      req.user = userData;
      next();
    });
  });
};
