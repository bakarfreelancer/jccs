const mongoose = require("mongoose");
require("dotenv").config();
// console.log(process.env);
mongoose.connect(process.env.DB_URI, {
  //   useUnifiedTopology: true,
  //   useNewUrlParser: true,
  //   useCreateIndex: true, //make this true
  autoIndex: true, //make this also true
});
