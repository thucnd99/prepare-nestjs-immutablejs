import { User } from "../../models/user.interface";
import * as authService from "../../services/auth.service";
import { authActions } from "../slices/auth.slice";
import { AppThunk } from "../store";

export const register = (user: User): AppThunk => {
  return async (dispatch) => {
    dispatch(authActions.isLoading);
    const sendRequest = async () => {
      const response = await authService.register(user);
      if (!response.data) {
        throw new Error("Can not sign up!");
      }
      return response.data;
    };
    try {
      const register = await sendRequest();
      console.log(register);
    } catch (error) {
      console.log(error);
    }
  };
};

export const login = (email: string, password: string): AppThunk => {
  return async (dispatch) => {
    dispatch(authActions.isLoading);
    const sendRequest = async () => {
      const response = await authService.login(email, password);
      if (!response.data) {
        throw new Error("Can not login!");
      }
      return response.data;
    };
    try {
      const authData = await sendRequest();
      dispatch(authActions.setToken(authData.token));
      dispatch(authActions.login());
    } catch (error) {
      console.log(error);
    }
  };
};

export const logout = (): AppThunk => {
  return (dispatch) => {
    try {
      dispatch(authActions.logout());
    } catch (error) {
      console.log(error)
    }
  }
}