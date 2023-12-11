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
    logoutUser: (state) => {
      state.user = {}; // Clear the user data when logging out
    },
  },
});

// Action creators are generated for each case reducer function
export const { getUserInfor , logoutUser} = userSlice.actions;
export default userSlice.reducer;