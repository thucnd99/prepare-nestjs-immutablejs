import { redirect } from "react-router";
import * as authService from "../../services/auth.service";
import { authActions } from "../slices/auth.slice";
import { AppDispatch } from "../store";

export const login = (email: string, password: string) => 
   async (dispatch: AppDispatch) => {
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


export const logout = () => {
  return (dispatch: AppDispatch) => {
    try {
      dispatch(authActions.logout());
    } catch (error) {
      console.log(error)
    }
  }
}