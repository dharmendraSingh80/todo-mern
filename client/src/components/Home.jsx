import { useEffect, useState } from "react";
import { createTodo, getTodos } from "../services/api";
import Header from "./partials/Header";
import Todo from "./partials/Todo";

function Home() {
  const [todos, setTodos] = useState([]);
  const [desc, setDesc] = useState("");
  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  useEffect(() => {
    if (user) {
      // console.log(user.token);
      getTodo(user.token);
    }
  }, []);

  const getTodo = async (token) => {
    const data = await getTodos(token);
    // console.log(data);
    setTodos(data.data.data.todos);
  };

  const handleChange = (e) => {
    setDesc(e.target.value);
  };
  const saveTodo = async () => {
    if (user) {
      console.log(desc);

      const data = {
        desc,
        token: user.token,
      };
      const result = await createTodo(data);
      console.log(result);
      getTodo(user.token);
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row justify-content-md-center mt-4">
          {user ? (
            todos.map((todo, index) => (
              <Todo todo={todo} key={index} getTodo={getTodo} />
            ))
          ) : (
            <h1 className="text-center">Login First to see your todo</h1>
          )}
        </div>
      </div>
      <div
        className=""
        style={{ position: "fixed", right: 50, bottom: 50, zIndex: 1030 }}
      >
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          className="btn btn-outline-primary"
        >
          Add
        </button>
      </div>
      <div className="modal mt-5" id="exampleModal">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">Add New Todo</div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="close"
              >
                <span arial-hidden="true"></span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <textarea
                  name=""
                  className="form-control"
                  onChange={handleChange}
                  rows={3}
                  placeholder="Write todos..."
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button onClick={saveTodo} className="btn btn-secondary">
                Save Todo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
