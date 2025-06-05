import { configureStore } from "@reduxjs/toolkit";
import psychologistsReducer from "./psychologists/psychologistsSlice";
import authReducer from "./auth/slice";
// import favoritesReducer from "./favorites/favoritesSlice";

export const store = configureStore({
  reducer: {
    psychologists: psychologistsReducer,
    auth: authReducer,
    // favorites: favoritesReducer,
    // filters: filtersReducer,
  },
});
