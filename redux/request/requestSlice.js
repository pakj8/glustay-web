// src/store/requestSlice.js
import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: {
    selectedRequests: [],
    hotelId: "",
  },
  reducers: {
    addRequest: (state, action) => {
      const reqWithMessage = {
        ...action.payload,
        message: action.payload.message || "",
      };
      state.selectedRequests.push(reqWithMessage);
    },
    removeRequest: (state, action) => {
      state.selectedRequests = state.selectedRequests.filter(
        (req) => req._id !== action.payload
      );
    },
    updateHotelId: (state, action) => {
      state.hotelId = action.payload;
    },
    updateReqMessage: (state, action) => {
      const { _id, message } = action.payload;
      const request = state.selectedRequests?.find((req) => req?._id === _id);
      if (request) {
        request.message = message;
      }
    },
    clearState: (state) => {
      state.selectedRequests = [];
      state.hotelId = "";
    },
  },
});

export const {
  addRequest,
  removeRequest,
  updateReqMessage,
  updateHotelId,
  clearState,
} = requestSlice.actions;
export default requestSlice.reducer;
