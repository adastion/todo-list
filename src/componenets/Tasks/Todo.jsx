import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { completedTask, deleteTask } from "./taskSlice";
import { Button } from "../../styles/Button.styles";

const TaskStyles = styled.ol`
  display: grid;

  & li {
    display: flex;
    align-items: space;
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

        & ~ label {
          background: green;
        }
      }
    }

    & label {
      transition: all 0.3s ease-in-out;
      width: 24px;
      height: 100%;
      background: red;
    }

    & span {
      transition: all 0.3s ease-in-out;
      cursor: pointer;
      text-transform: capitalize;
    }

    & span:last-child {
      &:hover {
        opacity: 0.7;
      }
    }
  }
`;

export const Todo = ({ tasks }) => {
  const dispatch = useDispatch();

  return (
    <>
      <h2>To do list</h2>
      <TaskStyles>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              id="toggleCompleted"
              type="checkbox"
              checked={task.completed}
              onChange={() => dispatch(completedTask({ id: task.id }))}
            />
            <label htmlFor="toggleCompleted"></label>
            <span onClick={() => dispatch(completedTask({ id: task.id }))}>
              {task.description}
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
