import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../componenets/Tasks/taskSlice";

export default configureStore({
  reducer: {
    tasks: taskReducer,
  },
});
