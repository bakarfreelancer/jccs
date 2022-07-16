const express = require("express");
require("./db/mongoose");

require("dotenv").config();
const userRouter = require("./routers/user");
const postRouter = require("./routers/post");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(postRouter);

app.listen(port, () => {
  console.log(`Server is up and running on port ${port} 🚀🚀🚀`);
});
