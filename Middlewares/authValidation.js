const joi = require("joi");
exports.registerValidation = (req, res, next) => {
  try {
    const schema = joi.object({
      firstName: joi.string().alphanum().min(3).max(30).required(),
      lastName: joi.string().alphanum().min(3).max(30).required(),
      email: joi.string().min(3).required().email(),
      password: joi
        .string()
        .pattern(
          new RegExp(
            "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
          ) // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
        )
        .required()
        .messages({
          "string.pattern.base":
            "Password must contain  at least Minimum eight characters, one uppercase letter, one lowercase letter, one number and one special character ",
        }),
      confirmPassword: joi
        .string()
        .valid(joi.ref("password"))
        .required()
        .messages({ "any.only": "Password not match" }),
    });
    const result = schema.validate(req.body);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    next();
  } catch (error) {
    next(error);
  }
};
exports.loginValidation = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().min(4).required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).json({ error: result.error });
  }
  next();
};
