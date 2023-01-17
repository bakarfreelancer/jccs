const { response } = require("express");

const express = require("express"),
  Post = require("../../models/post"),
  router = express.Router(),
  auth = require("../../middleware/auth"),
  LIMIT = 12;

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

// Get Single Post by id for logged in users
router.get("/post/:id", auth, async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.id,
      status: "published",
    }).populate({
      path: "author",
      select: "firstName lastName image description",
    });
    if (!post) {
      return res.status(404).send();
    }
    res.status(200).send(post);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Get Single Public Post by Id for loggedout users
router.get("/publicPost/:id", async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.id,
      visibility: "public",
      status: "published",
    }).populate({
      path: "author",
      select: "firstName lastName description",
    });
    if (!post) {
      return res.status(404).send();
    }
    res.status(200).send(post);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Get Single Post by id for logged in users to edit even get draft
router.get("/post-edit/:id", auth, async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.id,
      author: req.user._id,
    });
    if (!post) {
      return res.status(404).send();
    }
    res.status(200).send(post);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Get posts by user id for public
router.get("/post/user/:userId", auth, async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.userId });
    res.status(200).send(posts);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Get posts list of current user
router.get("/my-posts/:page", auth, async (req, res) => {
  try {
    const posts = await Post.find(
      {
        author: req.user._id,
        status: "published",
      },
      "title",
      {
        skip: LIMIT * req.params.page,
        limit: LIMIT,
        sort: { _id: -1 },
      }
    );
    res.status(200).send(posts);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Get posts list of current user
router.get("/my-drafts/:page", auth, async (req, res) => {
  try {
    const posts = await Post.find(
      {
        author: req.user._id,
        status: "draft",
      },
      "title",
      {
        skip: LIMIT * req.params.page,
        limit: LIMIT,
        sort: { _id: -1 },
      }
    );
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
