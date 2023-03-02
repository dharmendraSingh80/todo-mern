const express = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/loginControllers");
const { markTodo } = require("../controllers/markTodoController");
const { register } = require("../controllers/registerController");
const { removeTodo } = require("../controllers/removeTodoController");
const { createTodo } = require("../controllers/todoController");
const { getTodos } = require("../controllers/todoListController");
const { LoginSchema } = require("../validationSchema/LoginSchema");
const { RegisterSchema } = require("../validationSchema/RegisterSchema");

const apiRoute = express.Router();
const apiProtected = express.Router();

apiRoute.post("/register", RegisterSchema, register);
apiRoute.post("/login", LoginSchema, login);

//protected routes;
apiProtected.post(
  "/createTodo",
  [check("desc", "Todo desc is required").exists()],
  createTodo
);

apiProtected.post(
  "/marktodo",
  [check("todo_id", "Todo id is required").exists()],
  markTodo
);

apiProtected.post(
  "/deleteTodo",
  [check("todo_id", "Todo id is required").exists()],
  removeTodo
);

apiProtected.get("/todolist", getTodos);

module.exports = { apiRoute, apiProtected };
