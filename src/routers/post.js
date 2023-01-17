const express = require("express"),
  router = express.Router(),
  postGet = require("./post-routes/postGet"),
  postPost = require("./post-routes/postPost"),
  postPatch = require("./post-routes/postPatch"),
  postDelete = require("./post-routes/postDelete");

router.use("/", postGet);
router.use("/", postPost);
router.use("/", postPatch);
router.use("/", postPatch);
router.use("/", postDelete);

module.exports = router;
