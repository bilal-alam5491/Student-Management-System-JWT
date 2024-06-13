const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log(err.message);
    process.exit(0);
  }
};

module.exports = connectDB
