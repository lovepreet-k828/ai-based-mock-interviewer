import { createSlice } from "@reduxjs/toolkit";

export const totalRecordedInfoSlice = createSlice({
  name: "totalRecordedInfo",
  initialState: {
    totalRecordedInfo: {}
  },
  reducers: {
    setTotalRecordedInfo: (state, action) => {
      state.totalRecordedInfo = action.payload;
    },
    addTotalRecordedInfo: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      let newTotalRecordedInfo = {
        ...state.totalRecordedInfo,
      };
      newTotalRecordedInfo[Object.keys(action.payload)[0]] = Object.values(
        action.payload
      )[0];
      state.totalRecordedInfo = newTotalRecordedInfo;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTotalRecordedInfo, addTotalRecordedInfo } = totalRecordedInfoSlice.actions;

export default totalRecordedInfoSlice.reducer;
