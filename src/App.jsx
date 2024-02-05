import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Counter } from "./componenets/Counter/Counter";
import { Todo } from "./componenets/Tasks/Todo.jsx";
import { addTask } from "./componenets/Tasks/taskSlice";
import { styled } from "styled-components";
import { Button } from "./styles/Button.styles.js";

const AppStyles = styled.div`
  font-size: 1.5rem;

  & input {
    font-size: 2rem;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
  }
`;

function App() {
  const [inputValue, setInputValue] = useState("");
  const valueTask = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    dispatch(addTask(inputValue));
    setInputValue("");
  };

  return (
    <AppStyles>
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
        <Button onClick={handleAddTask}>add task</Button>
      </main>
      <Todo tasks={valueTask} />
      <Counter />
    </AppStyles>
  );
}

export default App;
