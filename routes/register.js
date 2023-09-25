const express = require("express");
const controller = require("../controllers/usersAuthentication");
const { registerValidation } = require("../Middlewares/authValidation");
const router = express.Router();

router
  .route("/")
  .post(registerValidation, controller.registerUser)
  .get(controller.getUser);
module.exports = router;
