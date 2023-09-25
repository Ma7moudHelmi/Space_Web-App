const express = require("express");

const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    res.send("from get method in account");
  })
  .post((req, res) => {
    res.send("from get method in account");
  });
module.exports = router;
