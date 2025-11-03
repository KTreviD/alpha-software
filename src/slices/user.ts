import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: {
    id: number;
    name: string;
    surnames?: string;
    email: string;
    currentSessionId: number;
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
    setUser: (state, action: PayloadAction<UserState["user"]>) => {
      state.user = action.payload;
    },
    clearUser: state => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = AuthSlice.actions;
export default AuthSlice.reducer;
