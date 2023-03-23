import { applyMiddleware } from 'redux'
import { legacy_createStore as createStore, Store} from 'redux'
import thunk from "redux-thunk"
import reducers from "./reducer";
import { Action } from './action/action';
import { Dispatch } from 'react';
export const store: Store<RootState, Action> & {
    dispatch: Dispatch<Action>
  } = createStore(
    reducers,
    applyMiddleware(thunk)
)
export type RootState = ReturnType<typeof reducers>
export type AppDispatch = typeof store.dispatch