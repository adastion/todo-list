import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchDataList = createAsyncThunk(
  "tasks/fetchDataList",
  async function (_, rejecWithValue) {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=15"
      );

      if (!response.ok) {
        throw new Error("Server crushed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejecWithValue(error.message);
    }
  }
);

export const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    todolist: [],
    status: null,
    error: null,
  },
  reducers: {
    addTask: (state, action) => {
      if (action.payload)
        state.todolist.unshift({
          id: crypto.randomUUID(),
          title: action.payload,
          completed: false,
        });
    },
    deleteTask: (state, action) => {
      return state.todolist.filter((task) => task.id !== action.payload.id);
    },
    completedTask: (state, action) => {
      const toggledTask = state.todolist.find(
        (task) => task.id === action.payload.id
      );
      toggledTask.completed = !toggledTask.completed;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataList.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchDataList.fulfilled, (state, action) => {
        state.status = "resolved";
        state.todolist = action.payload;
      })
      .addCase(fetchDataList.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const { addTask, deleteTask, completedTask } = taskSlice.actions;

export default taskSlice.reducer;
