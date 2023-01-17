const express = require("express"),
  User = require("../../models/user"),
  router = express.Router(),
  auth = require("../../middleware/auth"),
  upload = require("../../middleware/fileupload");

// Update user details
router.patch("/user/:id", auth, upload.single("image"), async (req, res) => {
  // const url = req.protocol + "://" + req.get("host");

  const image = req?.file ? "/uploads/" + req.file.filename : "";

  if (image) req.body.image = image;
  if (req.body.qualification)
    req.body.qualification = JSON.parse(req.body.qualification);

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
