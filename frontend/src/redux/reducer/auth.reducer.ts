import { AuthActionType } from "../action.types/auth.action.types";
import { Action } from "../action/action";
import { Map } from "immutable";

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
        case AuthActionType.LOGOUT: 
        return state.merge({
            'token': '',
            'isLoggedIn': false
        });
        default:
            return state;
    }
}

export default authReducer;