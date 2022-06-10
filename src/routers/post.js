const express = require("express");
const Post = require("../models/post");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/post", auth, async (req, res) => {
  const post = new Post(req.body);
  try {
    await post.save();
    res.status(201).send(post);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
