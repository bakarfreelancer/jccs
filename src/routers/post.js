const express = require("express"),
  Post = require("../models/post"),
  router = express.Router(),
  auth = require("../middleware/auth"),
  multer = require("multer");
const uuid = require("uuid");

const DIR = "./src/uploads/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuid.v4() + "-" + fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

router.post("/post", auth, upload.single("image"), async (req, res) => {
  const url = req.protocol + "://" + req.get("host");

  const post = new Post({
    ...req.body,
    image: url + "/uploads/" + req.file.filename,
    author: req.user._id,
  });
  try {
    await post.save();
    res.status(201).send(post);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Get all posts
router.get("/post", auth, async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).send(posts);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Get Post by id
router.get("/post/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
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

// Get public posts
router.get("/publicPost/", async (req, res) => {
  try {
    const posts = await Post.find({
      visibility: "Public",
      status: "Published",
    });
    res.status(200).send(posts);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Get Published Posts
router.get("/publishedPost/", async (req, res) => {
  try {
    const posts = await Post.find({ status: "Published" });
    res.status(200).send(posts);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Update Post
router.patch("/post/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const post = await Post.findById(req.params.id);
    updates.forEach((update) => (post[update] = req.body[update]));
    await post.save();
    if (!post) {
      return res.status(404).send();
    }
    res.send(post);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Delete post by id
router.delete("/post/:id", auth, async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).send();
    }
    res.send(post);
  } catch (e) {
    res.status(500).send(e);
  }
});
module.exports = router;
