const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  // getting cookie from request
  const token = req.cookies.token;

  // checking if there is a cookie then decode it otherwise direct to login page
  if (!token) {
    res.send("Please login first!!!");
    res.tokenData = null;
  } else {
    try {
      // decoding token
      const decode = jwt.verify(token, process.env.JWTKEY);
      // console.log(decode);

      // passing tokenData to use in controller
      req.tokenData = decode;
      return next();
    } catch (error) {
      console.log(error.message);
      res.status("400").json({ msg: error.message });
    }
  }
};

module.exports = auth;
