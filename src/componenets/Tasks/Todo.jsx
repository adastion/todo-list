import React from "react";
import styled from "styled-components";

const TaskStyles = styled.ol`
  & li {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 0.4rem 1rem;

    & input[type="checkbox"] {
      &:checked + span {
        text-decoration: line-through;
        opacity: 0.7;
      }
    }

    & span {
      text-transform: capitalize;
    }

    & span:last-child {
      cursor: pointer;

      &:hover {
        opacity: 0.7;
      }
    }
  }
`;

export const Todo = ({ tasks }) => {
  return (
    <>
      <h2>To do list</h2>
      <TaskStyles>
        {tasks.map((task) => (
          <li key={task.id}>
            <input type="checkbox" />
            <span>{task.description}</span>
            <span>❌</span>
          </li>
        ))}
      </TaskStyles>
    </>
  );
};
