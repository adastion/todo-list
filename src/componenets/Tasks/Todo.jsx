import React from "react";

export const Todo = ({tasks}) => {
  return (
    <>
      <h2>To do list</h2>
      <ol>
        {tasks.map((task) => (
          <li key={task.id}>{task.description}</li>
        ))}
      </ol>
    </>
  );
};
