const express = require("express"),
  Post = require("../../models/post"),
  router = express.Router(),
  auth = require("../../middleware/auth");
upload = require("../../middleware/fileupload");

const LIMIT = 12;

// Add new post
router.post("/post", auth, upload.single("image"), async (req, res) => {
  const url = req.protocol + "://" + req.get("host");

  const image = req?.file ? "/uploads/" + req.file.filename : "";
  const post = new Post({
    ...req.body,
    image,
    author: req.user._id,
  });
  try {
    await post.save();
    res.status(201).send(post);
  } catch (e) {
    res.status(400).send(e);
  }
});

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
      select: "firstName lastName image",
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
