import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTodoList = createAsyncThunk(
  "tasks/fetchTodoList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10"
      );

      if (!response.ok) {
        throw new Error("Server Error");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTodoTask = createAsyncThunk(
  "tasks/deleteTodoTask",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Can't delete task. Server error.");
      }
      dispatch(deleteTask({ id }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    list: [],
    status: null,
    error: null,
  },
  reducers: {
    addTask: (state, action) => {
      if (action.payload)
        state.list.push({
          id: crypto.randomUUID(),
          title: action.payload,
          completed: false,
        });
    },
    deleteTask: (state, action) => {
      state.list = state.list.filter((task) => task.id !== action.payload.id);
    },
    completedTask: (state, action) => {
      const toggledTask = state.list.find(
        (task) => task.id === action.payload.id
      );
      toggledTask.completed = !toggledTask.completed;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTodoList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodoList.fulfilled, (state, action) => {
        state.status = "resolved";
        state.list = action.payload;
      })
      .addCase(fetchTodoList.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(deleteTodoTask.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const { addTask, deleteTask, completedTask } = taskSlice.actions;

export default taskSlice.reducer;
