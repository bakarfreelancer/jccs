const mongoose = require("mongoose");

const feedBackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
});
const Feedback = mongoose.model("Feedback", feedBackSchema);
module.exports = Feedback;
