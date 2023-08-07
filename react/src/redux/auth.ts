import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface State {
  token: string | null;
  user: User | null;
}

const initialState: State = {
  token: null,
  user: null,
};

export const tokenSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    resetToken: (state) => {
      state.token = null;
    },
    resetUser: (state) => {
      state.user = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToken, resetToken } = tokenSlice.actions;

export default tokenSlice.reducer;
