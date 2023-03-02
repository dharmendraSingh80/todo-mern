const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { StatusCode, JWT_TOKEN_SECRET } = require("../utils/constants");
const { jsonGenerate } = require("../utils/helpers");
const User = require("../models/User");

module.exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const { name, username, password, email } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const userExist = await User.findOne({
      $or: [
        {
          email: email,
        },
        {
          username: username,
        },
      ],
    });
    if (userExist) {
      return res.json(
        jsonGenerate(
          StatusCode.UNPROCESSABLE_ENTITY,
          "User or Email already exists"
        )
      );
    }

    //save to db
    try {
      const result = await User.create({
        name,
        email,
        password: hashPassword,
        username,
      });

      const token = JWT.sign({ userId: result._id }, JWT_TOKEN_SECRET);

      res.json(
        jsonGenerate(StatusCode.SUCCESS, "Registration successfull", {
          userId: result._id,
          token,
        })
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    return res.json(
      jsonGenerate(
        StatusCode.VALIDATION_ERROR,
        "Validation error",
        errors.mapped()
      )
    );
  }
};
