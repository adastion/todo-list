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
      return state.filter((task) => task.id !== action.payload);
    },
    completedTask: (state, action) => {
      if (!state.completed) {
        state.completed = action.payload;
      }
    },
  },
});

export const { addTask, deleteTask, completedTask } = taskSlice.actions;

export default taskSlice.reducer;
