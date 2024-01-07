import { createSlice } from "@reduxjs/toolkit";

const createRecognition = () => {
  const recognition = new (window.webkitSpeechRecognition || window.SpeechRecognition)();
  recognition.continuous = true;
  recognition.interimResults = true;
  return recognition;
};

const recognition = createRecognition();

const recordSlice = createSlice({
  name: "record",
  initialState: {
    isRecording: false,
    textContent: "",
  },
  reducers: {
    Recourding: (state, action) => {
      state.isRecording = true;
    },
    stopRecord: (state) => {
      state.isRecording = false;
    },
  },
});

export const { Recourding, stopRecord } = recordSlice.actions;
export default recordSlice.reducer;