import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PageState } from "./page.state";

const initialState: PageState = {
  isLoading: false,
  gmail: "",
  password: "",
  rememberMe: false,
  error: "",
};

const pageSlice = createSlice({
  name: "LoginPage",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setGmail(state, action: PayloadAction<string>) {
      state.gmail = action.payload;
      state.error = "";
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
      state.error = "";
    },
    setRememberMe(state, action: PayloadAction<boolean>) {
      state.rememberMe = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setGmail, setPassword, setRememberMe, setError } =
  pageSlice.actions;

export const LoginPageReducer = pageSlice.reducer;
