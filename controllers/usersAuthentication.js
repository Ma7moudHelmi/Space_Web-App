const usersSchema = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const joi = require("joi");

exports.registerUser = async (req, res, next) => {
  // To check if user is already exist
  try {
    const existingUser = await usersSchema.findOne({ email: req.body.email });
    if (existingUser)
      return res.status(400).json({ error: "Email already exists" });
  } catch (err) {
    return res.status(400).json({ error: "something went wrong" });
  }
  const hash = bcrypt.hashSync(req.body.password, 10);
  let userSchema = new usersSchema({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hash,
  });
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
      if (data == null) throw new Error("email not found");
      if (data.length !== 0) {
        if (!bcrypt.compareSync(req.body.password, data.password)) {
          throw new Error("Invalid password");
        }

        token = jwt.sign(
          { id: data._id, email: data.email },
          process.env.JWT_SEC_KEY,
          { expiresIn: "10h" }
        );
        console.log("data");

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
  delete req.id;
  delete req.email;
  res.clearCookie("x_access_token");
  res.end();
};
