const mongoose = require('mongoose');


const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.group = require("./group.model");

module.exports = db;