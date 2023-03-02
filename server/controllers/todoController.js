const { validationResult } = require("express-validator");
const { jsonGenerate } = require("../utils/helpers");
const { StatusCode } = require("../utils/constants");
const User = require("../models/User");
const Todo = require("../models/Todo");

module.exports.createTodo = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    res.json(
      jsonGenerate(
        StatusCode.VALIDATION_ERROR,
        "Todo is required",
        error.mapped()
      )
    );
  }
  try {
    const result = await Todo.create({
      userId: req.userId,
      desc: req.body.desc,
    });
    if (result) {
      const user = await User.findOneAndUpdate(
        { _id: req.userId },
        {
          $push: { todos: result },
        }
      );
      return res.json(
        jsonGenerate(StatusCode.SUCCESS, "Todo created Successfully", result)
      );
    }
  } catch (error) {
    return res.json(
      jsonGenerate(
        StatusCode.UNPROCESSABLE_ENTITY,
        "Something went wrong",
        error
      )
    );
  }
};
