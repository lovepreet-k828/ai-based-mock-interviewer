import { createSlice } from "@reduxjs/toolkit";

export const voiceToneSlice = createSlice({
  name: "voiceTone",
  initialState: {
    voiceTone: {}
  },
  reducers: {
    addVoiceTone: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      let newvoiceTone = {
        ...state.voiceTone
      };
      newvoiceTone[Object.keys(action.payload)[0]]=Object.values(action.payload)[0];
      state.voiceTone = newvoiceTone;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addVoiceTone } = voiceToneSlice.actions;

export default voiceToneSlice.reducer;
