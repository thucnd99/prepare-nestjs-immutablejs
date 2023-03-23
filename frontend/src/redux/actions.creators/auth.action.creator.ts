import { Dispatch } from "redux";
import { Action } from "../action/action";
import * as authService from "../../services/auth.service";
import { LOGIN, LOGOUT } from "../action.types/auth.action.types";

export const login = (email: string, password: string) => {
  return async (dispatch: Dispatch<Action>) => {
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
        type: LOGIN,
        payload: authData.token,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const logout = () => {
  return (dispatch: Dispatch<Action>) => {
    try {
      dispatch({
        type: LOGOUT,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
