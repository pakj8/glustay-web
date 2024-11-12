import { configureStore } from "@reduxjs/toolkit";
import requestReducer from "../redux/request/requestSlice";

export const store = configureStore({
  reducer: {
    requests: requestReducer,
  },
});

export default store;
