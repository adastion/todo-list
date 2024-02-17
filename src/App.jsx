import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { Todo } from "./componenets/Tasks/Todo.jsx";
import { addTodoTask } from "./componenets/Tasks/taskSlice";
import { Button } from "./styles/Button.styles.js";
import { Field } from "./styles/Field.js";
import { FlexWrap } from "./styles/FlexWrap";

const AppStyles = styled.div`
  font-size: 1.5rem;
  padding-top: 1rem;
  display: grid;
  width: 100%;

  & > * + * {
    margin-top: 3rem;
  }

  @media screen and (max-width: 768px) {
    text-align: center;
    padding: 1rem;
  }
`;

const MainContent = styled.section`
  display: grid;
  gap: 1rem;
`;

function App() {
  const [inputValue, setInputValue] = useState("");
  const valueTask = useSelector((state) => state.tasks.list);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    dispatch(addTodoTask(inputValue));
    setInputValue("");
  };

  return (
    <AppStyles>
      <header>
        <h1>To do List</h1>
      </header>
      <MainContent>
        <FlexWrap align={"center"} justify={"space-between"}>
          <label htmlFor="enterNewTask"></label>
          <Field
            id="enterNewTask"
            type="text"
            placeholder="please enter task"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
          <Button onClick={handleAddTask}>add task</Button>
        </FlexWrap>
        <Todo tasks={valueTask} />
      </MainContent>
    </AppStyles>
  );
}

export default App;
