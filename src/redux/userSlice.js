import { createSlice } from "@reduxjs/toolkit";

const testUser = {
  id: 1,
  firstname: "John",
  lastname: "Doe",
  email: "johndoe@example.com",
  accessToken: "fake-jwt-token-123456789",
};

const userSlice = createSlice({
  name: "user",
  initialState: testUser,
  reducers: {
    login(state, action) {
      return action.payload;
    },
    logout(state, action) {
      return {};
    },
  },
});

const { reducer, actions } = userSlice;

export const { login, logout } = actions;

export default reducer;
