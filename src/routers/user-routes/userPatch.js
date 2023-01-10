const express = require("express"),
  User = require("../../models/user"),
  router = express.Router(),
  auth = require("../../middleware/auth");

// Update user details
router.patch("/user/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const user = await User.findById(req.params.id);
    updates.forEach((update) => {
      user[update] = req.body[update];
    }),
      await user.save();
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
