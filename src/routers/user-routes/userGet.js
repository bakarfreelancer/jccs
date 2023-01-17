const Post = require("../../models/post"),
  express = require("express"),
  User = require("../../models/user"),
  router = express.Router(),
  auth = require("../../middleware/auth");

// Get all users
// TODO: It should be improved
router.get("/user", auth, async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send();
  }
});

// Get user by id
router.get("/user/:id", auth, async (req, res) => {
  try {
    const user = await User.findOne(
      {
        _id: req.params.id,
        active: true,
      },
      "-password"
    );
    // Get user posts
    const posts = await Post.find(
      { author: req.params.id, status: "published" },
      "_id date title",
      {
        limit: 4,
        sort: { _id: -1 },
      }
    );
    res.status(200).send({ user, posts });
  } catch (e) {
    res.status(500).send();
  }
});

// Get user by email
router.get("/user/:email", auth, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
