import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import {toggleAddNewAdminPopup } from "../slices/popUpSlice";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users:[],
    loading: false,
  },
  reducers: {
    fetchAllUsersRequest: (state) => {
      state.loading = true;
    },
    fetchAllUsersSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    fetchAllUsersFailed: (state, action) => {
      state.loading = false;
      toast.error(action.payload);
    },
    addNewAdminRequest: (state) => {
      state.loading = true;
    },
    addNewAdminSuccess: (state, action) => {
      state.loading = false;
      // state.user.push(action.payload);
      // toast.success("New admin added successfully");
    },
    addNewAdminFailed: (state, action) => {
      state.loading = false;
      // toast.error(action.payload);
    },
  },
});

export const fetchAllUsers = () => async (dispatch) => {
  dispatch(userSlice.actions.fetchAllUsersRequest());

  await axios
    .get("http://localhost:8000/api/v1/user/all", {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(userSlice.actions.fetchAllUsersSuccess(res.data.users));
    })
    .catch((error) => {
      dispatch(userSlice.actions.fetchAllUsersFailed(error.response.data.message));
    });
};

export const addNewAdmin = (data) => async (dispatch) => {
  dispatch(userSlice.actions.addNewAdminRequest());
  await axios
    .post("http://localhost:8000/api/v1/user/add/new-admin", data, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      dispatch(userSlice.actions.addNewAdminSuccess());
      toast.success(res.data.message);
      dispatch(toggleAddNewAdminPopup());
    })
    .catch((error) => {
      dispatch(userSlice.actions.addNewAdminFailed());
      toast.error(error.response.data.message);
    });
};


export default userSlice.reducer;