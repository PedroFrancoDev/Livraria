import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './booksSlice.js';
import notesReducer from './notesSlice.js';
import userReducer from "./usersSlice.js";
import loadingReducer from './loadingSlice.js';

export default configureStore({
  reducer: {
    books: booksReducer,
    notes: notesReducer,
    users: userReducer,
    loading: loadingReducer,
  }
})