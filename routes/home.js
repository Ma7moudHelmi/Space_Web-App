const express = require("express");
const token = require("../Middlewares/authorization");
const router = express.Router();

router
  .route("/")
  .get(token, (req, res, next) => {
    res.send(req.id);
    console.log(req.id);
  })
  .post((req, res) => {
    res.send("from get method in /");
  });
module.exports = router;
