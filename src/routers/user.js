const express = require("express"),
  router = express.Router(),
  User = require("../models/user"),
  auth = require("../middleware/auth"),
  userGet = require("./user-routes/userGet"),
  userPost = require("./user-routes/userPost");
userPatch = require("./user-routes/userPatch");

router.use("/", userGet);
router.use("/", userPost);
router.use("/", userPatch);

module.exports = router;
