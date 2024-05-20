const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../helpers/requireLogin");
const Post = mongoose.model("Post");
const User = mongoose.model("User");

router.get("/user/:id", requireLogin, async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    return res.status(400).json({ Message: "User Not Found" });
  }

  const posts = await Post.find({ postedBy: req.params.id }).populate(
    "postedBy",
    "_id name",
  );
  if (!posts) {
    return res.status(400).json({ Message: "Posts Not Found" });
  }

  console.log(posts);
  return res.status(200).json({ user, posts });
});

router.put("/follow", requireLogin, async (req, res) => {
  const user = await Post.findById(req.body.followId);

  if (!user.followers.includes(req.user.id)) {
    User.findByIdAndUpdate(
      req.body.followId,
      {
        $push: { followers: req.user._id },
      },
      {
        new: true,
      },
      (err, result) => {
        if (!err) return res.status(500).json({ error: err });

        User.findByIdAndUpdate(
          req.body.followId,
          {
            $push: { following: req.body.followId },
          },
          {
            new: true,
          },
        )
          .select("-password")
          .catch((err) => {
            return res.status(422).json({ error: err });
          });

        return res.status(200).json({ Message: "Follow done", Result: result });
      },
    );
  }

  User.findByIdAndUpdate(
    req.body.followId,
    {
      $pull: { followers: req.user._id },
    },
    {
      new: true,
    },
    (err, result) => {
      if (!err) return res.status(500).json({ error: err });

      User.findByIdAndUpdate(
        req.body.followId,
        {
          $pull: { following: req.body.followId },
        },
        {
          new: true,
        },
      )
        .select("-password")
        .catch((err) => {
          return res.status(422).json({ error: err });
        });

      return res.status(200).json({ Message: "Follow done", Result: result });
    },
  );
});

router.put("/updatepic", requireLogin, (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { $set: { pic: req.body.pic } },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: "pic could not be updated" });
      }
      res.status(200).json(result);
    },
  );
});

router.post("/search-users", (req, res) => {
  let userPattern = new RegExp("^" + req.body.query);
  User.find({ email: { $regex: userPattern } })
    .select("_id email")
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
