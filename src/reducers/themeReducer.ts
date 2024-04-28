import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const themeReducer = createSlice({
  name: "theme",
  initialState: "light",
  reducers: {
    setTheme(state, action: PayloadAction<string>) {
      state = action.payload;
      return state;
    },
  },
});

export const { setTheme } = themeReducer.actions;
