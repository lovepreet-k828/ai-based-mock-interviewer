import { createSlice } from "@reduxjs/toolkit";

export const totalMaxExpresionsSlice = createSlice({
  name: "totalMaxExpresions",
  initialState: {
    totalMaxExpresions: [],
  },
  reducers: {
    addMaxExpresions: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.totalMaxExpresions = [...state.totalMaxExpresions, action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addMaxExpresions } = totalMaxExpresionsSlice.actions;

export default totalMaxExpresionsSlice.reducer;
