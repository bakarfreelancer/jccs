const express = require("express"),
  Post = require("../models/post"),
  router = express.Router(),
  auth = require("../middleware/auth"),
  multer = require("multer"),
  uuid = require("uuid"),
  postGet = require("./post-routes/postGet"),
  postPost = require("./post-routes/postPost"),
  postPatch = require("./post-routes/postPatch"),
  postDelete = require("./post-routes/postDelete");

router.use("/", postGet);
router.use("/", postPost);
router.use("/", postPatch);
router.use("/", postPatch);
router.use("/", postDelete);

const DIR = "./src/uploads/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuid.v4() + "-" + fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

// Add new post
router.post("/post", auth, upload.single("image"), async (req, res) => {
  const url = req.protocol + "://" + req.get("host");

  const image = req?.file ? url + "/uploads/" + req.file.filename : "";
  const post = new Post({
    ...req.body,
    image,
    author: req.user._id,
  });
  try {
    await post.save();
    res.status(201).send(post);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
