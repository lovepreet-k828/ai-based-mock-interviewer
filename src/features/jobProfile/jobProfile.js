import { createSlice } from "@reduxjs/toolkit";

export const jobProfileSlice = createSlice({
  name: "jobProfile",
  initialState: {
    jobProfile: {post:"sde", exp:"0"}
  },
  reducers: {
    setJobProfile: (state, action) => {
      state.jobProfile = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setJobProfile } = jobProfileSlice.actions;

export default jobProfileSlice.reducer;
