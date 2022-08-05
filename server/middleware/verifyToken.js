const jwt = require("jsonwebtoken");
const createError = require("../error/error");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return next(createError(401, "You are not authenticated!"));

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));

    req.user = user.id;
    next();
  });
};

module.exports = verifyToken;