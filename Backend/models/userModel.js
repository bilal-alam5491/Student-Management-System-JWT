const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// password hashing using bcrypt
userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    next();
  }

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(user.password, saltRound);
    user.password = hashedPass;
  } catch (error) {
    console.log(error.message);
  }
});

// comparing password
userSchema.methods.comparePassword = async function (password){
  return await bcrypt.compare(password , this.password)
 }


// generating jwtToken
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        userEmail: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWTKEY,
      {
        expiresIn: "1d",
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};

const User = mongoose.model("users", userSchema);

module.exports = User;
