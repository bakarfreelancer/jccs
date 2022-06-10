const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/jccs", {
  //   useUnifiedTopology: true,
  //   useNewUrlParser: true,
  //   useCreateIndex: true, //make this true
  autoIndex: true, //make this also true
});
