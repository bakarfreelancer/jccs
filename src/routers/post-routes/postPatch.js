const upload = require("../../middleware/fileupload");

const express = require("express"),
  Post = require("../../models/post"),
  router = express.Router(),
  auth = require("../../middleware/auth");

// Update Post
router.patch(
  "/post/:id/:authorId",
  auth,
  upload.single("image"),
  async (req, res) => {
    const image = req?.file ? "/uploads/" + req.file.filename : "";
    if (image) req.body.image = image;
    const updates = Object.keys(req.body);
    try {
      const post = await Post.findOne({
        _id: req.params.id,
        author: req.user._id,
      });
      updates.forEach((update) => {
        post[update] = req.body[update];
      });
      await post.save();
      if (!post) {
        return res.status(404).send();
      }
      res.send(post);
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

module.exports = router;
