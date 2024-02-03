import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "task",
  initialState: [
    {
      defaultTask: "create task",
    },
  ],
  reducers: {
    addTask: (state, action) => {
      state.push(action);
    },
    // deleteTask: (state) => {},
  },
});

export const { addTask } = taskSlice.actions;
export default taskSlice.reducer;
