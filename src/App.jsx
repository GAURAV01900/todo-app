import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");

  //filter todos
  const [filter,setFilter] = useState("all");

  const filteredTodos = todos.filter((todo)=>{
    if(filter=="active")
      return !todo.completed

    if(filter=="completed")
      return todo.completed

    return true


  })

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);

    setInput("");
  };

  const deleteTodo = (id) => {
    const updated = todos.filter((todo) => todo.id != id);

    setTodos(updated);
  };

  const updateTodo = (id) => {
    const newTodo = prompt("Enter the new todo : ");
    const updated = todos.map((todo) =>
      todo.id === id ? { ...todo, text: newTodo } : todo,
    );
    setTodos(updated);
  };

  const toggleComplete = (id) => {
    const completede = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );

    setTodos(completede);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-10">
        <h1 className="text-3xl font-bold text-center bg-amber-200">
          Todo App
        </h1>

        <div className="flex gap-2 ">
          <div className="flex gap-2 align-center mt-2">
            {/* <h2 className="mt-3"></h2> */}
            <input
              type="text"
              className="border p-2 rounded mt-2"
              value={input}
              placeholder="Enter your task"
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <button
              className="bg-blue-500 text-white px-4 rounded"
              onClick={addTodo}
            >
              Add
            </button>

            <button
              className="bg-red-500 text-white px-3 rounded"
              onClick={()=>{setTodos([])}}
            >
              Clear All
            </button>

          </div>
        </div>

        <div className="flex gap-2 mt-2">
          <button className="bg-green-500 text-white px-3 rounded" 
          onClick={()=>{setFilter("active")}}
          >Active</button>
          <button className="bg-blue-500 text-white px-3 rounded" 
          onClick={()=>{setFilter("completed")}}
          >Completed</button>
          <button className="bg-yellow-500 text-white px-3 rounded"
          onClick={()=>{setFilter("all")}}
          >ALL</button>
        </div>

        <ul className="mt-6 w-80 flex flex-col gap-2 ">
          {filteredTodos.map((todo) => (
            <>
              <div className="flex flex-row gap-2">
                <input
                  type="checkbox"
                  className=""
                  checked={todo.completed}
                  onChange={() => {
                    toggleComplete(todo.id);
                  }}
                />

                <li
                  key={todo.id}
                  className= {todo.completed? "flex justify-between bg-blue-200 p-2 mb-2 rounded shadow w-130" : "flex justify-between bg-yellow-100 p-2 mb-2 rounded shadow w-130"}
                >
                  <span
                    className={
                      todo.completed ? "line-through text-grey-400" : ""
                    }
                  >
                    {todo.text}
                  </span>
                </li>

                <button
                  className="bg-red-500 text-white px-1 rounded w-15"
                  onClick={() => deleteTodo(todo.id)}
                >
                  delete
                </button>

                <button
                  className="bg-green-500 text-white px-1 rounded 2-15"
                  onClick={() => updateTodo(todo.id)}
                >
                  update
                </button>
              </div>
            </>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
