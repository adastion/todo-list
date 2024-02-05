import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { completedTask, deleteTask } from "./taskSlice";
import { Button } from "../../styles/Button.styles";

const TaskStyles = styled.ol`
  & li {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 0.5rem 1rem;

    & input {
      &:checked {
        & + span {
          text-decoration: line-through;
          opacity: 0.3;
        }
      }
    }

    & span {
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
              type="checkbox"
              checked={task.completed}
              onChange={() => dispatch(completedTask({ id: task.id }))}
            />
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
