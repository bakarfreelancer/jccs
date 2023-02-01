const multer = require("multer");
const sharp = require("sharp");
const uuid = require("uuid");
const fs = require("fs");

const DIR = "./src/uploads/";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
  }
};

const postImgUpload = multer({ storage, fileFilter });

const resizePostImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return next();
    }
    req.body.image = `${uuid.v4()}-${req.file.originalname
      .toLowerCase()
      .split(" ")
      .join("-")}`;
    const image = await sharp(req.file.buffer);
    const metadata = await image.metadata();
    if (metadata.width > 1200) {
      const resized = await image
        .resize({ width: 1200 })
        .toFormat("jpeg")
        .toBuffer();
      fs.writeFileSync(`${DIR}/${req.body.image}`, resized);
    } else {
      const resized = await image.toFormat("jpeg").toBuffer();
      fs.writeFileSync(`${DIR}/${req.body.image}`, resized);
    }
    return next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { postImgUpload, resizePostImage };
/*
const multer = require("multer"),
  uuid = require("uuid");
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


module.exports = { upload, resizeImage };
*/
