import { AuthActionType } from "../action.types/auth.action.types";

interface LoginAction {
    type: AuthActionType.LOGIN,
    payload: string;
}

interface LogoutAction {
    type: AuthActionType.LOGOUT
}

export type Action = LoginAction | LogoutAction // | SomeAction....