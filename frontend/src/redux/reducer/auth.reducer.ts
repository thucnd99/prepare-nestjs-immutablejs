import { AuthActionType } from "../action.types/auth.action.types";
import { Action } from "../action/action";
import { Record, Map } from "immutable";

interface AuthState {
    token: string| null;
    isLoggedIn: boolean;
}

const AuthRecord = Record({
    token: null,
    isLoggedIn: false,
})



const initialState = Map({
    token: '',
    isLoggedIn: false,
})

const authReducer = (state = initialState, action: Action ) => {
    switch (action.type) {
        case AuthActionType.LOGIN: {
            return state.merge({
                'token': action.payload,
                'isLoggedIn': true
            });
        }
            // return { ...state, isLoggedIn: true, token: action.payload  };
        case AuthActionType.LOGOUT: 
        return state.merge({
            'token': '',
            'isLoggedIn': false
        });
            // return { ...state, isLoggedIn: false, token: null };
        default:
            return state;
    }
}

export default authReducer;