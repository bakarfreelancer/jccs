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

const profileUpload = multer({ storage, fileFilter });

const resizeProfileImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return next();
    }
    req.body.image = `${uuid.v4()}-${req.file.originalname
      .toLowerCase()
      .split(" ")
      .join("-")}`;
    const image = await sharp(req.file.buffer)
      .resize({ width: 150 })
      .toFormat("jpeg")
      .toBuffer();
    fs.writeFileSync(`${DIR}/${req.body.image}`, image);
    return next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { profileUpload, resizeProfileImage };
