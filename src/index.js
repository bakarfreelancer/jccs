const express = require("express");
require("./db/mongoose");
require("dotenv").config();

const userRouter = require("./routers/user");
const postRouter = require("./routers/post");
const feedbackRouter = require("./routers/feedback");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(userRouter);
app.use(postRouter);
app.use(feedbackRouter);

app.listen(port, () => {
  console.log(`Server is up and running on port ${port} 🚀🚀🚀`);
});
