import { createSlice } from "@reduxjs/toolkit";

export const realtimeAnsSlice = createSlice({
  name: "realtimeAns",
  initialState: {
    currentRealtimeAns: "",
  },
  reducers: {
    appendToCurrentRealtimeAns: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.currentRealtimeAns = state.currentRealtimeAns + action.payload;
    },
    setCurrentRealtimeAns: (state, action)=>{
      state.currentRealtimeAns = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { appendToCurrentRealtimeAns, setCurrentRealtimeAns } = realtimeAnsSlice.actions;

export default realtimeAnsSlice.reducer;
