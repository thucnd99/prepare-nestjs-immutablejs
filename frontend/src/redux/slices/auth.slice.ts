import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../models/user.interface';
import { RootState } from '../store';

interface AuthState {
    currentUser: User;
    token: string| null;
    isLoading: boolean;
    isLoggedIn: boolean;
}

const initialState : AuthState = {
    currentUser: {},
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
      setCurrentUser: (state, action: PayloadAction<User>) => {
        state.currentUser = action.payload
      },
      setToken: (state, action: PayloadAction<string>) => {
        state.token = action.payload
      },
      login:(state) => {
        state.isLoggedIn = true;
        state.isLoading = false;
      },
      logout(state) {
        state.currentUser = {};
        state.token = null;
        state.isLoading = false;
        state.isLoggedIn=false;
      },
    },
  });
  
  export const authActions = authSlice.actions;
  export const authSelector = (state: RootState) => state.auth
  export default authSlice;
  