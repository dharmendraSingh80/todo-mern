// import { toast, ToastContainer } from "react-toastify";
import { deleteTodo, updateTodo } from "../../services/api";

const Todo = ({ todo, getTodo }) => {
  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  const handleDelete = async (todo) => {
    const data = {
      todo_id: todo._id,
      token: user.token,
    };
    const result = await deleteTodo(data);
    getTodo(user.token);
    // console.log(result);
    if (result.status === 200) {
      if (result.data.status === 200) {
        alert(result.data.message);
        return;
      }
      if (result.data.status === 202) {
        alert(result.data.message);
        return;
      }
    }
  };

  const handleComplete = async (todo) => {
    const data = {
      todo_id: todo._id,
      token: user.token,
    };
    const result = await updateTodo(data);
    getTodo(user.token);
    // console.log(result);
    if (result.status === 200) {
      if (result.data.status === 200) {
        alert(result.data.message);
        return;
      }
      if (result.data.status === 202) {
        alert(result.data.message);
        return;
      }
    }
  };
  return (
    <div className="my-2 alert bg-info">
      <div className=" d-flex justify-content-between align-items-center">
        <button
          className={`button-complete task-button ${
            todo.isCompleted ? "bg-success" : "bg-danger"
          }`}
          onClick={() => handleComplete(todo)}
        >
          <i className="fa-solid fa-circle-check"></i>
        </button>
        <span>{todo.desc}</span>
        <span className="btn" onClick={() => handleDelete(todo)}>
          X
        </span>
      </div>
    </div>
  );
};
export default Todo;
