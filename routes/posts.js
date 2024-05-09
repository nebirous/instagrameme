const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { User } = require("../models/user");
const Post = mongoose.model("Post");
const requireLogin = require("../helpers/requireLogin");

router.get("/allPosts", requireLogin, async (req, res) => {
  const posts = await Post.find()
    .populate("postedBy", "_id name")
    .sort("-createdAt");

  if (!posts) return res.status(500).json({ error: "Post not found" });

  return res.status(200).json({ posts });
});

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

router.get("/myPosts", requireLogin, async (req, res) => {
  const posts = await Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .sort("-createdAt");

  if (!posts) return res.status(500).json({ error: "Post not found" });

  return res.status(200).json({ posts });
});

router.get("/post/:id", requireLogin, async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate("postedBy", "_id name")
    .sort("-createdAt");

  if (!post) return res.status(500).json({ error: "Post not found" });

  return res.status(200).json({ post });
});

router.put("/like", requireLogin, (req, res) => {
  const post = Post.findById(req.body.postId);
  console.log(post);

  if (post.likes.includes(req.user._id)) {
    console.log("unlike post");
    Post.findByIdAndUpdate(
      req.body.postId,
      {
        $pull: { likes: req.user._id },
      },
      {
        new: true,
      },
    ).exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        return res.status(200).json(result);
      }
    });
  }

  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    {
      new: true,
    },
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      return res.status(200).json(result);
    }
  });
});

module.exports = router;
