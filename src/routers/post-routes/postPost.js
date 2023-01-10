const express = require("express"),
  Post = require("../../models/post"),
  router = express.Router(),
  auth = require("../../middleware/auth");

const LIMIT = 3;

// Get posts for logged in users
router.post("/loggedInPosts", auth, async (req, res) => {
  try {
    const posts = await Post.find(
      {
        status: "published",
      },
      "-content",
      {
        skip: LIMIT * req.body.page,
        limit: LIMIT,
        sort: { _id: -1 },
      }
    ).populate({
      path: "author",
      select: "firstName lastName",
    });
    res.status(200).send(posts);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Get public posts
router.post("/publicPost/", async (req, res) => {
  try {
    const posts = await Post.find(
      {
        visibility: "public",
        status: "published",
      },
      "-content",
      {
        skip: LIMIT * req.body.page,
        limit: LIMIT,
        sort: { _id: -1 },
      }
    ).populate({
      path: "author",
      select: "firstName lastName",
    });
    // await posts.populate("author").execPapulate();
    res.status(200).send(posts);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
