const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const mongoose = require("mongoose")
const User = mongoose.model("User");
const jwt = require('jsonwebtoken')

router.get("/", (req, res) => {
  res.send("hello");
});

router.post("/register", async (req, res) => {
  console.log(req.body)
  const { name, email, password, city, country } = req.body;

  if (!name || !email || !password) {
    return res
      .status(422)
      .json({ error: "please fill the required fields!" });
  }

  if (await User.findOne({ email: email })) {
    return res.status(422).json({ error: "E-Mail already registered" });
  }
  let user = new User({
    name: name,
    email: email,
    password: bcrypt.hashSync(req.body.password, 10),
    city: city,
    country: country,
  });
  userSaved = await user.save();

  if (!userSaved) return res.status(400).send("the user cannot be created!");

  res.send(userSaved);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "please fill the required fields!" });
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).send('User not found');
  } 

  if(!bcrypt.compareSync(password, user.password)){
    return res.status(400).send('password is wrong!');
  }
   
  const token = jwt.sign(
    {
      userId: user.id,
      isAdmin: user.isAdmin,
    },
    process.env.SECRET,
    { expiresIn: '1d' }
  );
  
  return res.status(200).send({ user: user.email, token: token });    
});

module.exports = router;
