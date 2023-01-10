const express = require("express"),
  User = require("../../models/user"),
  router = express.Router(),
  auth = require("../../middleware/auth");

// Get all users
router.get("/user", auth, async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
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
