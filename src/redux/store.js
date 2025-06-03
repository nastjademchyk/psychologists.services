import { configureStore } from "@reduxjs/toolkit";
import psychologistsReducer from "./psychologistsSlice";
export const store = configureStore({
  reducer: {
    psychologists: psychologistsReducer,
  },
});
