import { createSlice } from "@reduxjs/toolkit";

export const totalExpressionsSlice = createSlice({
  name: "totalExpressions",
  initialState: {
    totalExpressions: {}
  },
  reducers: {
    addExpressions: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      let newTotalExpressions = {
        ...state.totalExpressions,
      };
      newTotalExpressions[Object.keys(action.payload)[0]] = Object.values(
        action.payload
      )[0];
      state.totalExpressions = newTotalExpressions;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addExpressions } = totalExpressionsSlice.actions;

export default totalExpressionsSlice.reducer;
