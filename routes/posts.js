const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { User } = require("../models/user");
const Post = mongoose.model("Post");
const requireLogin = require("../helpers/requireLogin");

router.post("/createPost", requireLogin, async (req, res) => {
  const { title, description, photo } = req.body;

  if (!title || !description || !photo) {
    return res.status(422).json({ error: "please fill the required fields!" });
  }

  req.user.password = undefined;
  const post = new Post({
    title,
    description,
    photo,
    postedBy: req.user,
  });

  postSaved = await post.save();

  if (!postSaved) return res.status(400).send("the post could not be created!");

  return res.status(200).json(postSaved);
});

module.exports = router;
