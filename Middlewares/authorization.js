const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let decoded;

  if (!req.cookies["x_access_token"]) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    decoded = jwt.verify(
      req.cookies["x_access_token"],
      process.env.JWT_SEC_KEY
    );
  } catch (e) {
    return res.status(401).send("Invalid Token");
  }

  req.id = decoded.id;
  req.email = decoded.email;
  next();
};
