const express = require("express"),
  Post = require("../../models/post"),
  router = express.Router(),
  auth = require("../../middleware/auth");

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

module.exports = router;
