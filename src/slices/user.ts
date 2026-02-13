import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: {
    id: number;
    name: string;
    surnames?: string;
    email: string;
    userPreferences?: {
      enable2FA: boolean;
      emailNotification: boolean;
    };
  } | null;
}

const initialState: UserState = {
  user: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<UserState["user"]>) => {
      state.user = action.payload;
    },
    logoutUser: state => {
      state.user = null;
    },
  },
});

export const { loginUser, logoutUser } = AuthSlice.actions;
export default AuthSlice.reducer;
