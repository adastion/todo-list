import { useState } from "react";
import { Counter } from "./componenets/Counter/Counter";
import { addTask } from "./componenets/Tasks/taskSlice";
import { Todo } from "./componenets/Tasks/Todo.jsx";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function App() {
  const [inputValue, setInputValue] = useState("");
  const valueTask = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    dispatch(addTask(inputValue));
    setInputValue("");
  };

  return (
    <div>
      <header>
        <h1>List</h1>
      </header>
      <main>
        <label htmlFor="enterNewTask"></label>
        <input
          id="enterNewTask"
          type="text"
          placeholder="please enter task"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <button onClick={handleAddTask}>add task</button>
      </main>
      <Todo tasks={valueTask} />
      <Counter />
    </div>
  );
}

export default App;
