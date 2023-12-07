import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserInfor: (state, action) => {
        console.log("payload item la///////////////",action.payload)
      state.user = action.payload
    },
  },
});

// Action creators are generated for each case reducer function
export const { getUserInfor } = userSlice.actions;
export default userSlice.reducer;