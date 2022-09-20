import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  avatar: "",
}
export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUser: (state, {payload}) => {
      state.name = payload.username;
      state.email = payload.email;
      state.password = payload.password;
      state.confirmPassword = payload.cpassword;
      state.avatar = payload.fieldValue;
      return state
    }
  }
})

export const {registerUser} = UserSlice.actions;

export default UserSlice.reducer;