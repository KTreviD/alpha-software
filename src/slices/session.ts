import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SessionState {
  id: number | null;
}

const initialState: SessionState = {
  id: null,
};

const AuthSessionSlice = createSlice({
  name: "authSession",
  initialState,
  reducers: {
    loginSession: (state, action: PayloadAction<SessionState["id"]>) => {
      state.id = action.payload;
    },
    logoutSession: state => {
      state.id = null;
    },
  },
});

export const { loginSession, logoutSession } = AuthSessionSlice.actions;
export default AuthSessionSlice.reducer;
