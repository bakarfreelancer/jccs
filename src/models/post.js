const mongoose = require("mongoose");

// Post Schema will contain the following fields:
// - title: String (required) - The title of the post
// - content: String
// - image: String
// - date: Date - The date the post was created (defaults to current date)
// - author: String - The author of the post (User _id will be stored)
//  - visibility: String - Public or Private (defaults to Private)
//  - status: String - Published or Draft (defaults to Draft)

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String },
  image: { type: String },
  date: { type: Date, default: Date.now },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  visibility: { type: String, default: "private" },
  status: { type: String, default: "draft" },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
