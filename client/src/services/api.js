import axios from "axios";
import {
  CreateTodo,
  DelTodo,
  GETTODOS,
  LOGIN,
  MarkTodo,
  REGISTER,
} from "./apiConstants";

export const login = async (data) => {
  return await axios.post(LOGIN, data);
};

export const register = async (data) => {
  return await axios.post(REGISTER, data);
};
export const getTodos = async (token) => {
  return axios.get(GETTODOS, {
    headers: {
      auth: token,
    },
  });
};

export const deleteTodo = async ({ token, todo_id }) => {
  return axios.post(
    DelTodo,
    { todo_id },
    {
      headers: {
        auth: token,
      },
    }
  );
};
export const updateTodo = async ({ token, todo_id }) => {
  return axios.post(
    MarkTodo,
    { todo_id },
    {
      headers: {
        auth: token,
      },
    }
  );
};

export const createTodo = async ({ token, desc }) => {
  return axios.post(
    CreateTodo,
    { desc },
    {
      headers: {
        auth: token,
      },
    }
  );
};
