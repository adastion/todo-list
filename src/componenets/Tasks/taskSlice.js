import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      if(action.payload) 
      state.push({
        id: crypto.randomUUID(),
        description: action.payload,
      });
    },
  },
});

export const { addTask } = taskSlice.actions;

export default taskSlice.reducer;
