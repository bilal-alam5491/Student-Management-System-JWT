const express = require("express");
const studentRouter = express.Router();
const studentControllers = require("../controllers/studentController");
const auth = require("../middlewares/auth");

studentRouter.route("/add").post(auth, studentControllers.addStudent);
studentRouter.route("/get").get(auth, studentControllers.getStudents);

module.exports = studentRouter;
