import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Button } from "../../styles/Button.styles";
import {
  addTodoTask,
  deleteTodoTask,
  fetchTodoList,
  patchTodoTask
} from "./taskSlice";

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
  const { status, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTodoList({ id: tasks.id }));
  }, [dispatch, tasks.id]);

  return (
    <TaskStyles>
      <h2>list</h2>
      {console.log(tasks)}
      {status === "loading" && <h1>loading...</h1>}
      {error && <h1>... {error}</h1>}
      {tasks.map((task) => (
        <li key={task.id}>
          <input
            id="toggleCompleted"
            type="checkbox"
            checked={task.completed}
            onChange={() => dispatch(addTodoTask(task.title))}
          />
          <label htmlFor="toggleCompleted">
            {task.completed ? "👌" : "👆"}
          </label>
          <span onClick={() => dispatch(patchTodoTask(task.id))}>
            {task.title}
          </span>
          <Button onClick={() => dispatch(deleteTodoTask(task.id))}>❌</Button>
        </li>
      ))}
    </TaskStyles>
  );
};
