const Student = require("../models/studentModel");

const addStudent = async (req, res) => {
  try {
    // console.log(req.tokenData);
    if (req.tokenData) {
      const userId = req.tokenData.userId;
      // console.log(userId);

      const { name, email, phone } = req.body;
      // console.log(req.body);

      const datatoAdd = {
        name: name,
        email: email,
        phone: phone,
        addedBy: userId,
      };

      const addedStudent = await Student.create(datatoAdd);

      res.status(200).json({
        msg: "Student added",
        student: addedStudent,
      });
    }
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ error: error.message, msg: "Unable to add Student" });
  }
};

const getStudents = async (req, res) => {
  if (req.tokenData) {
    try {
      const userId = req.tokenData.userId;

      const studentsData = await Student.find({ addedBy: userId });

      return res.status(201).json({
        students: studentsData,
      });
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({
        msg: "Unable to get data",
        error: error.message,
      });
    }
  } else {
    return res.status(400).json({
      msg: "No token data",
    });
  }
};

module.exports = { addStudent, getStudents };
