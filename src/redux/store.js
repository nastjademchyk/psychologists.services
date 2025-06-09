import { configureStore } from "@reduxjs/toolkit";
import psychologistsReducer from "./psychologists/psychologistsSlice";
import authReducer from "./auth/slice";
import filtersReducer from "./filters/filtersSlice";

export const store = configureStore({
  reducer: {
    psychologists: psychologistsReducer,
    auth: authReducer,
    filters: filtersReducer,
  },
});
