const {
  postImgUpload,
  resizePostImage,
} = require("../../middleware/post-img-upload");

const express = require("express"),
  Post = require("../../models/post"),
  router = express.Router(),
  auth = require("../../middleware/auth");

// Update Post
router.patch(
  "/post/:id/:authorId",
  auth,
  postImgUpload.single("image"),
  resizePostImage,
  async (req, res) => {
    const image = req.body.image ? "/uploads/" + req.body.image : "";
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
