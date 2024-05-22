const express = require("express");
require("dotenv/config");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");
const requireLogin = require("../helpers/requireLogin");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.nodemailer,
    },
  }),
);

router.get("/", requireLogin, (req, res) => {
  res.send("hello");
});

router.post("/register", async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    return res.status(422).json({ error: "please fill the required fields!" });
  }

  if (await User.findOne({ email: email })) {
    return res.status(422).json({ error: "E-Mail already registered" });
  }
  let user = new User({
    name: name,
    email: email,
    password: bcrypt.hashSync(req.body.password, 10),
    pic: pic,
  });
  userSaved = await user.save();

  if (!userSaved) return res.status(400).send("the user cannot be created!");

  transporter.sendMail({
    to: user.email,
    from: "nebirous@hotmail.com",
    subject: "signup success",
    html: "<h1>welcome to instagrameme</h1>",
  });

  res.send(userSaved);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "please fill the required fields!" });
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).send("User not found");
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(400).send("Invalid email or password!");
  }

  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.SECRET,
    { expiresIn: "10d" },
  );

  const { _id, name, email: emailSaved, following, followers, pic } = user;
  return res.status(200).json({
    user: { id: _id, name: name, email: emailSaved, following, followers, pic },
    token: token,
  });
});

router.post("/reset-password", (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res
          .status(422)
          .json({ error: "User dont exists with that email" });
      }
      user.resetToken = token;
      user.expireToken = Date.now() + 3600000;
      user.save().then((result) => {
        transporter.sendMail({
          to: user.email,
          from: "nebirous@hotmail.com",
          subject: "password reset",
          html: `
                  <p>You requested for password reset</p>
                  <h5>click in this <a href="http://localhost:3000/reset/${token}">link</a> to reset password</h5>
                  `,
        });
        res.json({ message: "check your email" });
      });
    });
  });
});

router.post("/new-password", (req, res) => {
  const newPassword = req.body.password;
  const sentToken = req.body.token;
  User.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
    .then((user) => {
      if (!user) {
        return res.status(422).json({ error: "Try again session expired" });
      }
      bcrypt.hash(newPassword, 12).then((hashedpassword) => {
        user.password = hashedpassword;
        user.resetToken = undefined;
        user.expireToken = undefined;
        user.save().then((saveduser) => {
          res.json({ message: "password updated success" });
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
