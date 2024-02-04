import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      if (action.payload)
        state.push({
          id: crypto.randomUUID(),
          description: action.payload,
          completed: false,
        });
    },
    deleteTask: (state, action) => {
      return state.filter((task) => task.id !== action.payload.id);
    },
    completedTask: (state, action) => {
      const toggledTask = state.find((task) => task.id === action.payload.id);
      toggledTask.completed = !toggledTask.completed;
    },
  },
});

export const { addTask, deleteTask, completedTask } = taskSlice.actions;

export default taskSlice.reducer;
