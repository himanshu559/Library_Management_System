import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  message: null,
  user: null,
  isAuthenticated: false,
}; 

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    registerFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// This is an example of an asynchronous thunk action for user registration
export const register = (data) => async (dispatch) => {
  try {
    dispatch(registerRequest());
    const response = await axios.post(
      "http://localhost:4000/api/v1/auth/register",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(registerSuccess({ message: response.data.message }));
  } catch (error) {
    dispatch(registerFailed(error.response.data.message));
  } 
};
export const { registerRequest, registerSuccess, registerFailed } =
  authSlice.actions;
export default authSlice.reducer;
 
