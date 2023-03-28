import { createSlice } from "@reduxjs/toolkit";
export const historySlice = createSlice({
  name: "hitory",
  initialState: { value: [] },
  reducers: {
    addHistory: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

export const { addHistory } = historySlice.actions;
export default historySlice.reducer;
