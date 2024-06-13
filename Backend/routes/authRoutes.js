const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/authControllers");
const auth = require("../middlewares/auth");

router.route("/login").post(authControllers.login);
router.route("/register").post(authControllers.register);
router.route("/logout").get(auth, authControllers.logout);
router.route("/dashboard").get(auth, authControllers.dashboard);

module.exports = router;
