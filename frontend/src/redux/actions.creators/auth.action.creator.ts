import * as authService from "../../services/auth.service";
import { AuthActionType } from "../action.types/auth.action.types";
import { AppDispatch } from "../store";
export const login = (email: string, password: string) => 
   async (dispatch: AppDispatch) => {
    const sendRequest = async () => {
      const response = await authService.login(email, password);
      if (!response.data) {
        throw new Error("Can not login!");
      }
      return response.data;
    };
    try {
      const authData = await sendRequest();
      dispatch({
        type: AuthActionType.LOGIN,
        payload: authData.token,
      });
    } catch (error) {
      console.log(error);
    }
  };


export const logout = () => {
  return (dispatch: AppDispatch) => {
    try {
      dispatch({
        type: AuthActionType.LOGOUT,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
