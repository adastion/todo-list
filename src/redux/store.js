import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../componenets/Counter/counterSlice";
import taskReducer from "../componenets/Tasks/taskSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    task: taskReducer,
  },
  
});

console.log(counterReducer)