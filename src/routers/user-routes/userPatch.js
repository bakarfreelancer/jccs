const express = require("express"),
  User = require("../../models/user"),
  router = express.Router(),
  auth = require("../../middleware/auth"),
  {
    profileUpload,
    resizeProfileImage,
  } = require("../../middleware/profile-upload"),
  bcrypt = require("bcryptjs");

// Update user details
// TODO: Update the params
router.patch(
  "/user/:id",
  auth,
  profileUpload.single("image"),
  resizeProfileImage,
  async (req, res) => {
    const image = req.body.image ? "/uploads/" + req.body.image : "";

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
  }
);

// Update user password
router.patch("/updatePassword", auth, async (req, res) => {
  try {
    // compare passwords
    const isMatch = await await bcrypt.compare(
      req.body.oldPassword,
      req.user.password
    );
    if (!isMatch) {
      throw new Error("Current password is wrong");
    }
    req.user.password = req.body.password;
    const user = await req.user.save();
    res.send(user);
  } catch (error) {
    res.status(401).send(error);
  }
});
module.exports = router;
