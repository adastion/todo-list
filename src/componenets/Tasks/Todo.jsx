import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Button } from "../../styles/Button.styles";
import { completedTask, deleteTask } from "./taskSlice";

const TaskStyles = styled.ol`
  display: grid;
  overflow-y: auto;
  max-height: 500px;

  & li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    padding: 0.5rem 1rem;

    & input {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip: rect(1px, 1px, 1px, 1px);

      &:checked {
        & ~ span {
          text-decoration: line-through;
          opacity: 0.3;
          flex-grow: 1;
        }
      }
    }

    & label {
      transition: all 0.3s ease-in-out;
      width: 34px;
      font-size: 2rem;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      pointer-events: none;
    }

    & span {
      transition: all 0.3s ease-in-out;
      cursor: pointer;
      text-transform: capitalize;
      max-width: 500px;
      max-width: 500px;
      overflow: hidden;

      &:hover {
        opacity: 0.7;
      }
    }
  }
`;

export const Todo = ({ tasks }) => {
  const dispatch = useDispatch();

  const [testDataList, setTestDataList] = useState([]);
  const [count, setCount] = useState(5);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/todos?_limit=${count}`
        );
        const data = await response.json();
        setTestDataList(data);
      } catch (error) {
        console.log("message error ", error);
      }
    };
    getTodos();
  }, [count]);

  return (
    <>
      <Button onClick={() => setCount(count + 5)}>More</Button>
      <TaskStyles>
        <h2>list</h2>

        {testDataList.map((task) => (
          <li key={task.id}>
            <input
              id="toggleCompleted"
              type="checkbox"
              checked={task.completed}
              onChange={() => dispatch(completedTask({ id: task.id }))}
            />
            <label htmlFor="toggleCompleted">
              {task.completed ? "👌" : "👆"}
            </label>
            <span onClick={() => dispatch(completedTask({ id: task.id }))}>
              {task.title}
            </span>
            <Button onClick={() => dispatch(deleteTask({ id: task.id }))}>
              ❌
            </Button>
          </li>
        ))}
      </TaskStyles>
    </>
  );
};
