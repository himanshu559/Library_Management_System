import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import {toggleAddBookPopup, fetchAllBooks,} from "../slices/popUpSlice";

const bookSlice = createSlice({
  name: "book",
  initialState: {
    loading: false,
    books: [],
    error: null,
    message: null,
  },
  reducers: {
    fetchAllBooksRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    fetchAllBooksSuccess: (state, action) => {
      state.loading = false;
      state.books = action.payload;
    },
    fetchAllBooksFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    //  toast.error(action.payload);
    },  

    // Books Addition

    addBookRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    }
    ,
    addBookSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
     // state.message = "Book added successfully";
      // toast.success("Book added successfully");
    },
    addBookFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
      // toast.error(action.payload);
    },
    resetBookSlice: (state) => {
      state.loading = false;
     // state.books = [];
      state.error = null;
      state.message = null;
    },
  },

});
export const  fetchAllBooks = () => async (dispatch) => {
  dispatch(bookSlice.actions.fetchAllBooksRequest());
  await axios.get("http://localhost:8000/api/v1/book/all", {
    withCredentials: true,
  })
    .then((response) => {
      dispatch(bookSlice.actions.fetchAllBooksSuccess(response.data.books));
    })
    .catch((error) => {
      dispatch(bookSlice.actions.fetchAllBooksFailed(error.response.data.message));
    });
};

export const addBook = (data) => async (dispatch) => {
  dispatch(bookSlice.actions.addBookRequest());
  await axios.post("http://localhost:8000/api/v1/book/add", data, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      dispatch(bookSlice.actions.addBookSuccess(response.data.message));
      dispatch(toggleAddBookPopup());
       toast.success(response.data.message);
       dispatch(fetchAllBooks());
    })
    .catch((error) => {
      dispatch(bookSlice.actions.addBookFailed(error.response.data.message));
     // toast.error(error.response.data.message);
    });
};

export const resetBookSlice = () => (dispatch) => {
  dispatch(bookSlice.actions.resetBookSlice());
};

export default bookSlice.reducer;