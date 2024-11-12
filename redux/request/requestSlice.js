// src/store/requestSlice.js
import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: {
    selectedRequests: [],
  },
  reducers: {
    addRequest: (state, action) => {
      state.selectedRequests.push(action.payload);
    },
    removeRequest: (state, action) => {
      state.selectedRequests = state.selectedRequests.filter(
        (req) => req._id !== action.payload
      );
    },
  },
});

export const { addRequest, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
