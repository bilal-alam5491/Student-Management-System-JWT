require("dotenv").config();
const express = require("express");
const router = require("./routes/authRoutes.js");
const connectDB = require("./db/db.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const studentRouter = require("./routes/studentRoutes");

const app = express();
const PORT = process.env.PORT || 2000;

app.use(express.json());
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/", router);
app.use("/student", studentRouter);

connectDB()
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Connection error ", err.message);
  });
