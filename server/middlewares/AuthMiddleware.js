const JWT = require("jsonwebtoken");
const { StatusCode, JWT_TOKEN_SECRET } = require("../utils/constants");
const { jsonGenerate } = require("../utils/helpers");

module.exports.AuthMiddleware = (req, res, next) => {
  if (req.headers["auth"] === undefined) {
    return res.json(jsonGenerate(StatusCode.AUTH_ERROR, "Access Denied"));
  }
  const token = req.headers["auth"];
  try {
    const decoded = JWT.verify(token, JWT_TOKEN_SECRET);
    console.log(decoded);
    req.userId = decoded.userId;
    return next();
  } catch (error) {
    return res.json(
      jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Invalid token")
    );
  }
};
