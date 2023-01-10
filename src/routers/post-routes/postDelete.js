const express = require("express"),
  Post = require("../../models/post"),
  router = express.Router(),
  auth = require("../../middleware/auth");

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
