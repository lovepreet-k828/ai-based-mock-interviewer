import { createSlice } from "@reduxjs/toolkit";

export const currentTimeSlice = createSlice({
  name: "currentTime",
  initialState: {
    currentTime: "",
  },
  reducers: {
    setCurrentTime: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.currentTime = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentTime } = currentTimeSlice.actions;

export default currentTimeSlice.reducer;
