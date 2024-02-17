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

export const patchTodoTask = createAsyncThunk(
  "tasks/patchTodoTask",
  async (id, { rejectWithValue, dispatch, getState }) => {
    const todo = getState().tasks.list.find((todolist) => todolist.id === id);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            completed: !todo.completed,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Can't toggle status. Server error.");
      }
      dispatch(completedTask({ id }));
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

export const addTodoTask = createAsyncThunk(
  "tasks/addTodoTask",
  async (text, { rejectWithValue, dispatch }) => {
    try {
      const todolist = {
        userId: 1,
        title: text,
        completed: false,
      };
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/`,
        {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(todolist)
        },
      );

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error("Can't add task. Server error.");
      }
      console.log(data)
      dispatch(addTask(data))
      
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};

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
        state.list.unshift(action.payload);
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
      .addCase(fetchTodoList.rejected, setError)
      .addCase(deleteTodoTask.rejected, setError)
      .addCase(addTodoTask.rejected, setError)
      .addCase(patchTodoTask.rejected, setError)
  },
});

export const { addTask, deleteTask, completedTask } = taskSlice.actions;

export default taskSlice.reducer;
