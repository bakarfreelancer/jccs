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

module.exports = upload;
/*const multer = require("multer");
const sharp = require("sharp");
const uuid = require("uuid");

const DIR = "./src/uploads/";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
  }
};

const upload = multer({ storage, fileFilter });

const resizeImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return next();
    }
    req.body.photo = `${uuid.v4()}-${req.file.originalname.toLowerCase().split(" ").join("-")}`;
    const photo = await sharp(req.file.buffer)
      .resize({ width: 120 })
      .toFormat("jpeg")
      .toBuffer();
    fs.writeFileSync(`${DIR}/${req.body.photo}`, photo);
    return next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { upload, resizeImage };
*/
