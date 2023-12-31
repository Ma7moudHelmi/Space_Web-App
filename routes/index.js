const express = require("express");
const account = require("./account");
const userAuthentication = require("./authentication");
const register = require("./register");
const home = require("./home");
const authMW = require ("../Middlewares/authorization")

const router = express.Router();

/* routes pages. */
router.use("/user", userAuthentication);
router.use("/register", register);
router.use("/account", account);
router.use("/", authMW,home);

module.exports = router;
