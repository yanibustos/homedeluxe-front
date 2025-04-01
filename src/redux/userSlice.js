import { createSlice } from "@reduxjs/toolkit";

const testUser = {
  id: 1,
  firstname: "John",
  lastname: "Doe",
  email: "johndoe@example.com",
  accessToken: "fake-jwt-token-123456789",
  avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsd6jEYWceiGnd-fmcfMQU81ME5zJj63buBw&s",
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
