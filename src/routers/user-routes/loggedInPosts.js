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
      {},
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

// module.exports = router;
