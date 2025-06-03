import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDatabase, ref, get } from "firebase/database";
import app from "../firebase";

export const fetchPsychologists = createAsyncThunk(
  "psychologists/fetchAll",
  async (_, thunkAPI) => {
    try {
      const db = getDatabase(app);
      const psychologistsRef = ref(db, "psychologists");
      const snapshot = await get(psychologistsRef);
      if (!snapshot.exists()) {
        return [];
      }
      const rawData = snapshot.val();
      const data = Object.values(rawData);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
