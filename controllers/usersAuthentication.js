const usersSchema = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const joi = require("joi");

exports.registerUser = (req, res, next) => {
  const hash = bcrypt.hashSync(req.body.password, 10);
  let userSchema = new usersSchema({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hash,
  });
  console.log(userSchema);
  userSchema
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
};
exports.getUser = (req, res, next) => {
  usersSchema
    .find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
};
exports.loginUser = (req, res, next) => {
  let token;
  usersSchema
    .findOne({ email: req.body.email })
    .then((data) => {
      console.log(data);
      if (data.length !== 0) {
        if (!bcrypt.compareSync(req.body.password, data.password)) {
          throw new Error("Invalid password");
        }
        token = jwt.sign(
          { id: data._id, email: data.email },
          process.env.JWT_SEC_KEY,
          { expiresIn: "10h" }
        );
        if (token) {
          console.log("in token");
          res
            .status(200)
            .cookie("x_access_token", token, { httpOnly: true })
            .json({ message: "all is done" });
        } else {
          throw new Error("something went wrong");
        }
      } else {
        throw new Error("email or password not correct");
      }
    })
    .catch((err) => {
      next(err.message);
    });
};
exports.logoutUser = (req, res, next) => {
  console.log("in logout");

  delete req.id;
  delete req.email;
  res.clearCookie("x_access_token");
  res.end();
};
