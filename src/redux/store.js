import { configureStore } from "@reduxjs/toolkit";
import psychologistsReducer from "./psychologists/psychologistsSlice";
import authReducer from "./auth/slice";
export const store = configureStore({
  reducer: {
    psychologists: psychologistsReducer,
    auth: authReducer,
  },
});
