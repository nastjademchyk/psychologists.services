import { createSlice } from "@reduxjs/toolkit";
import { fetchPsychologists } from "./operations";

const initialState = {
  items: [],
  loading: false,
  error: false,
};

const psychologistsSlice = createSlice({
  name: "psychologists",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchPsychologists.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchPsychologists.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPsychologists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default psychologistsSlice.reducer;
