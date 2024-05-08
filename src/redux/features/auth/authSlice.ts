import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface TUser {
  firstName: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

interface TInitialState {
  user: TUser;
  token: string;
  isLoggedIn: boolean;
}

const initialState: TInitialState = {
  user: {
    firstName: "",
    email: "",
    role: "",
    iat: 0,
    exp: 0,
  },
  token: "",
  isLoggedIn: false,
};

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      state.user = { firstName: "", email: "", role: "", iat: 0, exp: 0 };
      state.token = "";
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, setToken, logOut } = authSlice.actions;

export default authSlice.reducer;
