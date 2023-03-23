import { LOGIN, LOGOUT } from "../action.types/auth.action.types";
import { Action } from "../action/action";

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

        case LOGIN:
            return { ...state, isLoggedIn: true, token: action.payload  };
        case LOGOUT: 
            return { ...state, isLoggedIn: false, token: null };
        default:
            return state;
    }
}

export default authReducer;