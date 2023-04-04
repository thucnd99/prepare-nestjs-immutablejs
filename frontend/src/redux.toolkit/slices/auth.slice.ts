import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface AuthState {
    token: string| null;
    isLoading: boolean;
    isLoggedIn: boolean;
}

const initialState : AuthState = {
    token: null,
    isLoading: false,
    isLoggedIn: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
      isLoading(state) {
        state.isLoading = true;
      },
      setToken: (state, action: PayloadAction<string>) => {
        state.token = action.payload;
        state.isLoading = false;
      },
      login:(state) => {
        state.isLoggedIn = true;
        state.isLoading = false;
      },
      logout(state) {
        state.token = null;
        state.isLoading = false;
        state.isLoggedIn=false;
      },
    },
  });
  
  export const authActions = authSlice.actions;
  export const authSelector = (state: RootState) => state.auth
  export default authSlice;
  