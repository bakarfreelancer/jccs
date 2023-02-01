const express = require("express"),
  router = express.Router(),
  feedbackPost = require("./feedback-routes/feedbackPost");

router.use("/", feedbackPost);
module.exports = router;
