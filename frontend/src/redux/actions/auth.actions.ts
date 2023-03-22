import * as authService from "../../services/auth.service";
import { authActions } from "../slices/auth.slice";
import { AppThunk } from "../store";

export const login = (email: string, password: string) : AppThunk => 
   async (dispatch) => {
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


export const logout = (): AppThunk => {
  return (dispatch) => {
    try {
      dispatch(authActions.logout());
    } catch (error) {
      console.log(error)
    }
  }
}