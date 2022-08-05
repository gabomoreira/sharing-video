const mongoose = require("mongoose");

const connectDB = (url) => {
  mongoose.connect(url, console.log("MongoDB is connected"));
};

module.exports = connectDB;
