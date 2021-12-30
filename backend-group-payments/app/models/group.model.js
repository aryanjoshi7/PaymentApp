const mongoose = require("mongoose");

const Group = mongoose.model(
  "Group",
  new mongoose.Schema({
    key: String,
    members: Array
  })
);

module.exports = Group;