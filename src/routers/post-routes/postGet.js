const express = require("express"),
  Post = require("../../models/post"),
  router = express.Router(),
  auth = require("../../middleware/auth");

// Get Single Post by id
router.get("/post/:id", auth, async (req, res) => {
  try {
    const post = await Post.findOne(
      {
        _id: req.params.id,
        status: "published",
      },
      "-content"
    ).populate({
      path: "author",
      select: "firstName lastName",
    });
    if (!post) {
      return res.status(404).send();
    }
    res.status(200).send(post);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Get all posts
// TODO: only for admin
router.get("/post", auth, async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).send(posts);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Get Single Public Post by Id
router.get("/publicPost/:id", async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.id,
      visibility: "public",
      status: "published",
    });
    if (!post) {
      return res.status(404).send();
    }
    res.status(200).send(post);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Get posts by user id
router.get("/post/user/:userId", auth, async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.userId });
    res.status(200).send(posts);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Get Published Posts
router.get("/publishedPost/", async (req, res) => {
  try {
    const posts = await Post.find({ status: "published" });
    res.status(200).send(posts);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
