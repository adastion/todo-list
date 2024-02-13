import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { Counter } from "./componenets/Counter/Counter";
import { Spotify } from "./componenets/Spotify/Spotify.jsx";
import { Todo } from "./componenets/Tasks/Todo.jsx";
import { addTask, fetchDataList } from "./componenets/Tasks/taskSlice";
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
  const valueTask = useSelector((state) => state.tasks.todolist);
  const { status, error } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    dispatch(addTask(inputValue));
    setInputValue("");
  };

  useEffect(() => {
    dispatch(fetchDataList());
  }, [dispatch]);

  return (
    <AppStyles>
      <header>
        <h1>To do List</h1>
      </header>

      <Spotify />
      {/* <MainContent>
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
        {status === "loading" && <h2>Loading....</h2>}
        {error && <h2>ERROR {error} </h2>}
        <Todo tasks={valueTask} />
      </MainContent>
      <Counter /> */}
    </AppStyles>
  );
}

export default App;
