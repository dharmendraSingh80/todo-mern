const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { StatusCode, JWT_TOKEN_SECRET } = require("../utils/constants");
const { jsonGenerate } = require("../utils/helpers");
const User = require("../models/User");

module.exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.json(
        jsonGenerate(
          StatusCode.UNPROCESSABLE_ENTITY,
          "username/password is incorrect"
        )
      );
    }
    const verified = bcrypt.compareSync(password, user.password);
    if (!verified) {
      return res.json(
        jsonGenerate(
          StatusCode.UNPROCESSABLE_ENTITY,
          "username/password is incorrect"
        )
      );
    }
    const token = JWT.sign({ userId: user._id }, JWT_TOKEN_SECRET);
    return res.json(
      jsonGenerate(StatusCode.SUCCESS, "Login Successful", {
        userId: user._id,
        token,
      })
    );
  } else {
    res.json(
      jsonGenerate(
        StatusCode.VALIDATION_ERROR,
        "Validation error",
        errors.mapped()
      )
    );
  }
};
