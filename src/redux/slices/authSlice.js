import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false, user:{} },
  reducers: {
    addUser:(state, action) => { state.user = action.payload; },
    login: (state) => { state.isLoggedIn = true; },
    logout: (state) => { state.isLoggedIn = false; },
  },
});

export const { login, logout, addUser } = authSlice.actions;
export default authSlice.reducer;
