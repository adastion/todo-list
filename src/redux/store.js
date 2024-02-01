import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  title: "title",
};

function reducer(state = initialState, action) {
  console.log("reducer>>>>", action);

  return state;
}

export default configureStore(reducer);
