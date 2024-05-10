const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { User } = require("../models/user");
const Post = mongoose.model("Post");
const requireLogin = require("../helpers/requireLogin");

router.get("/allPosts", requireLogin, async (req, res) => {
  const posts = await Post.find()
    .populate("postedBy", "_id name")
    .populate("comments.postedBy", "_id name")
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

router.put("/like", requireLogin, async (req, res) => {
  const post = await Post.findById(req.body.postId);

  if (post.likes.includes(req.user.id)) {
    const updatePost = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        $pull: { likes: req.user.id },
      },
      { new: true },
    );

    if (!updatePost) return res.status(500).send("unlike didnt work!");

    return res.status(200).json(updatePost);
  }

  const updatePost = await Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user.id },
    },
    { new: true },
  );

  if (!updatePost) return res.status(500).send("like didnt work!");

  return res.status(200).json(updatePost);
});

router.put("/comment", requireLogin, async (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };

  if (!comment.text) {
    return res.status(500).send("empty comment!");
  }

  const updateComment = await Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    {
      new: true,
    },
  )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name");

  if (!updateComment) return res.status(500).send("comment didnt work!");

  return res.status(200).json(updateComment);
});

module.exports = router;
