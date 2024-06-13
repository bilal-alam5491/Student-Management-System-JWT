const User = require("../models/userModel");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      res.status(400).json({ msg: "Email already registered" });
    } else {
      const createdUser = await User.create({
        name,
        email,
        password,
      });

      const jwtToken = await createdUser.generateToken();

      res.status(200).json({
        msg: "Registered Succesfully",
        jwtToken: jwtToken,
        userId: createdUser._id.toString(),
      });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      res.status(400).json({ msg: "Invalid Credentials" });
    }

    const user = await userExist.comparePassword(password);

    if (user) {
      // generating jwtToken
      const token = await userExist.generateToken();
      //creating cookie
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        // httpOnly: true,
      };
      // sending response
      res.status(200).cookie("token", token, options).json({
        msg: "Login Successfull",
        token: token,
      });
    } else {
      res.status(400).json({
        msg: "Invalid email and password",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const dashboard = (req, res) => {
  // console.log(req.tokenData);

  res.status(200).json({ msg: "Welcome to Dashboard " });
};

const logout = (req, res) => {
  if (req.tokenData) {
    return res
      .clearCookie("token")
      .status(200)
      .json({ message: "Successfully logged out" });
  }
};



module.exports = { login, register, dashboard, logout };
