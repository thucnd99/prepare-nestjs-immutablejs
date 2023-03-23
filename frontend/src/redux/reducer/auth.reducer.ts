import { AuthActionType } from "../action.types/auth.action.types";
import { Action } from "../action/action";
import {} from "immutable"
interface AuthState {
    token: string| null;
    isLoggedIn: boolean;
}

const initialState : AuthState = {
    token: null,
    isLoggedIn: false,
}

const authReducer = (state: AuthState = initialState, action: Action ) => {
    switch (action.type) {

        case AuthActionType.LOGIN:
            return { ...state, isLoggedIn: true, token: action.payload  };
        case AuthActionType.LOGOUT: 
            return { ...state, isLoggedIn: false, token: null };
        default:
            return state;
    }
}

export default authReducer;