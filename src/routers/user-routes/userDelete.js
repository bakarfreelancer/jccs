const User = require("../../models/user"),
  express = require("express"),
  router = express.Router(),
  auth = require("../../middleware");

// Delete user by Id
