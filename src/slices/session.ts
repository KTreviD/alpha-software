import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SessionState {
  session: {
    id: number;
  } | null;
}

const initialState: SessionState = {
  session: null,
};

const AuthSessionSlice = createSlice({
  name: "authSession",
  initialState,
  reducers: {
    loginSession: (state, action: PayloadAction<SessionState["session"]>) => {
      state.session = action.payload;
    },
    logoutSession: state => {
      state.session = null;
    },
  },
});

export const { loginSession, logoutSession } = AuthSessionSlice.actions;
export default AuthSessionSlice.reducer;
