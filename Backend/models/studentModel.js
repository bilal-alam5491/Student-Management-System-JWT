const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  addedBy: {
    type: String,
    required: true,
  },
});

const Student = mongoose.model("Student", studentSchema); // Use singular model name

module.exports = Student;
