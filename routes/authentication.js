const express = require("express");
const controller = require("../controllers/usersAuthentication");
const { loginValidation } = require("../Middlewares/authValidation");
const router = express.Router();

router.post("/login", loginValidation, controller.loginUser);
router.post("/logout", controller.logoutUser);

module.exports = router;
